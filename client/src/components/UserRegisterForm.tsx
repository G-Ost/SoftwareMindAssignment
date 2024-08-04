import { Button } from "@/shadcn/components/ui/button";
import { Form } from "@/shadcn/components/ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import DropdownInput from "./common/DropdownInput";
import TextInput from "./common/TextInput";
import DatePickerInput from "./common/DatePickerInput";
import { useEffect } from "react";
import { differenceInYears, isFuture } from "date-fns";
import { changeGlobalFontSize, fetcher } from "@/lib/utils";
import { FontSizeMode } from "@/lib/constants";
import useSWRImmutable from "swr/immutable";
import LoadingSpinner from "./common/LoadingSpinner";
import { createUser } from "@/lib/userService";

const formSchema = yup.object().shape({
  continent: yup.string().when("lastName", ([lastName], schema) => {
    return lastName.length < 2
      ? schema.notOneOf(["Europa"], "Nie spełnione kryteria")
      : schema.notRequired();
  }),
  name: yup.string().required("To pole jest wymagane"),
  lastName: yup.string(),
  birthDate: yup.date(),
});

const UserRegisterForm = () => {
  const {
    data: continents,
    isLoading: isContinentsDataLoading,
    error: continentsFetchingError,
  } = useSWRImmutable<string[]>("/api/continents", fetcher);

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      continent: "",
      name: "",
      lastName: "",
      birthDate: undefined,
    },
  });

  const { handleSubmit, control, setValue, watch, reset } = form;

  const birthDate = watch("birthDate");
  const isSubmitDisabled = birthDate && isFuture(birthDate);
  useEffect(() => {
    if (birthDate) {
      const usersAge = differenceInYears(new Date(), birthDate);
      const isUserOlderThanSixty = usersAge > 60;
      changeGlobalFontSize(
        isUserOlderThanSixty ? FontSizeMode.LARGE : FontSizeMode.NORMAL
      );
    }
  }, [birthDate]);

  const onSubmit = async (values: yup.InferType<typeof formSchema>) => {
    try {
      const response = await createUser({ ...values });
      if (response.ok) {
        alert("sukces!");
        reset();
      } else {
        throw new Error();
      }
    } catch (e) {
      alert("Coś poszło nie tak, spróbuj ponownie później.");
    }
  };

  if (isContinentsDataLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner size={60} />
      </div>
    );
  }

  if (continentsFetchingError || !continents || continents.length === 0) {
    return (
      <div className="flex justify-center text-sm pt-14 font-bold h-full">
        Coś poszło nie tak. Spróbuj ponownie później.
      </div>
    );
  }
  const continentDropdownOptions = continents.map((continent) => ({
    label: continent,
    value: continent,
  }));

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-1 grid grid-cols-1 w-full"
      >
        <TextInput
          control={control}
          name="name"
          label="Imię*"
          placeholder="Wpisz tutaj..."
        />
        <TextInput
          control={control}
          name="lastName"
          label="Nazwisko"
          placeholder="Wpisz tutaj..."
        />
        <DropdownInput
          control={control}
          name="continent"
          onSetValue={(newValue: string) => {
            setValue("continent", newValue);
          }}
          options={continentDropdownOptions}
          placeholder="Wybierz kontynent..."
          label="Kontynent"
        />
        <DatePickerInput
          control={control}
          name="birthDate"
          placeholder="Wybierz datę..."
          label="Data urodzenia"
        />
        <Button
          disabled={isSubmitDisabled}
          aria-disabled={!isSubmitDisabled}
          aria-label="Wyślij"
          className="bg-oceanic text-white mt-4"
          type="submit"
        >
          Wyślij
        </Button>
      </form>
    </Form>
  );
};

export default UserRegisterForm;
