import { User } from "@/lib/userService";
import { fetcher } from "@/lib/utils";
import { format } from "date-fns";
import useSWRImmutable from "swr/immutable";
import LoadingSpinner from "./LoadingSpinner";
import UserSearchResultRow from "./UserSearchResultRow";

interface UserSearchResult {
  userId: string;
}

const UserSearchResult = ({ userId }: UserSearchResult) => {
  const { data, isLoading, error } = useSWRImmutable<User>(
    `/api/form/${userId}`,
    fetcher
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner size={60} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-md mt-5 text-center font-bold">
        Nie znaleziono użytkownika.
      </div>
    );
  }

  const { continent, name, birthDate, lastName } = data;

  const userDataMap: { label: string; value: string | undefined }[] = [
    { label: "Imię", value: name },
    { label: "Nazwisko", value: lastName },
    { label: "Kontynent", value: continent },
    {
      label: "Data urodzenia",
      value: birthDate ? format(birthDate, "dd-MM-yyyy") : "-",
    },
  ];

  return (
    <div className="flex flex-col gap-2 mt-4 min-w-0 w-fit max-w-full">
      {userDataMap.map((entry) => (
        <UserSearchResultRow key={entry.label} {...entry} />
      ))}
    </div>
  );
};

export default UserSearchResult;
