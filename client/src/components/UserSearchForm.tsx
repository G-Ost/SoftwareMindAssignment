import { useForm } from "react-hook-form";
import * as yup from "yup";
import TextInput from "./common/TextInput";
import { Form } from "@/shadcn/components/ui/form";
import { Button } from "@/shadcn/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import UserSearchResult from "./common/UserSearchResult";

const formSchema = yup.object().shape({
  userId: yup.string().required(),
});

const UserSearchForm = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const form = useForm({
    reValidateMode: "onSubmit",
    resolver: yupResolver(formSchema),
    defaultValues: {
      userId: "",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = form;

  const onSubmit = async (values: yup.InferType<typeof formSchema>) => {
    setUserId(values.userId);
    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
        <span className="text-xl font-bold text-center mb-4">Wyszukiwanie</span>
        <TextInput
          control={control}
          name="userId"
          label="Identyfikator użytkownika"
          placeholder="Wpisz tutaj..."
        />
        {userId && <UserSearchResult userId={userId} />}
        <Button
          disabled={!isValid}
          className="bg-oceanic text-white mt-auto"
          type="submit"
        >
          Szukaj
        </Button>
      </form>
    </Form>
  );
};

export default UserSearchForm;
