import { Button } from "@/shadcn/components/ui/button";
import { Form } from "@/shadcn/components/ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import DropdownInput from "./common/DropdownInput";
import TextInput from "./common/TextInput";
import DatePickerInput from "./common/DatePickerInput";
import { useEffect } from "react";
import { differenceInYears } from "date-fns";
import { changeGlobalFontSize, fetcher } from "@/lib/utils";
import { FontSizeMode } from "@/lib/constants";
import useSWR from "swr";
import LoadingSpinner from "./common/LoadingSpinner";

const formSchema = yup.object().shape({
  continent: yup.string(),
  name: yup.string().required(),
  lastName: yup.string(),
  birthDate: yup.date(),
});

const UserRegisterForm = () => {
  const {
    data: continents,
    isLoading: isContinentsDataLoading,
    error: continentsFetchingError,
  } = useSWR<string[]>("/api/continents", fetcher);

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      continent: undefined,
      name: undefined,
      lastName: undefined,
      birthDate: undefined,
    },
  });

  const { handleSubmit, control, setValue, watch } = form;

  const birthDate = watch("birthDate");

  useEffect(() => {
    if (birthDate) {
      const usersAge = differenceInYears(new Date(), birthDate);
      const isUserOlderThanSixty = usersAge > 60;
      changeGlobalFontSize(
        isUserOlderThanSixty ? FontSizeMode.LARGE : FontSizeMode.NORMAL
      );
    }
  }, [birthDate]);

  const onSubmit = (values: yup.InferType<typeof formSchema>) => {
    console.log(values);
  };

  if (isContinentsDataLoading) {
    return (
      <div className="flex justify-center items-center flex-1">
        <LoadingSpinner size={60} />
      </div>
    );
  }

  if (continentsFetchingError || !continents || continents.length === 0) {
    return (
      <div className="flex justify-center flex-1 items-center font-bold">
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
        className="gap-4 grid grid-cols-1 w-full"
      >
        <TextInput
          control={control}
          name="name"
          label="Imię"
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
        <Button className="bg-oceanic text-white mt-4" type="submit">
          Wyślij
        </Button>
      </form>
    </Form>
  );
};

export default UserRegisterForm;
