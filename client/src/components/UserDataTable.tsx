import { deleteUserById, User } from "@/lib/userService";
import { fetcher, getDisplayValue } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import clsx from "clsx";
import { format } from "date-fns";
import useSWR from "swr";
import LoadingSpinner from "./common/LoadingSpinner";
import { Trash2Icon } from "lucide-react";
import { useCallback, useState } from "react";

const UserDataTable = () => {
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const {
    data: users,
    isLoading: isUserDataLoading,
    isValidating: isUserDataValidating,
    error,
    mutate,
  } = useSWR<User[]>("/api/form", fetcher, { shouldRetryOnError: false });

  const onDeleteUser = useCallback(
    async (userId: number) => {
      setIsDeletingUser(true);
      try {
        await deleteUserById(userId);
        mutate();
      } catch (_) {
        alert("Coś poszło nie tak, spróbuj później.");
      } finally {
        setIsDeletingUser(false);
      }
    },
    [mutate]
  );

  const isLoading = isUserDataLoading || isDeletingUser || isUserDataValidating;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner size={60} />
      </div>
    );
  }

  if (!users || users.length === 0 || error) {
    return (
      <div className="x font-bold text-sm flex justify-center pt-14 h-full">
        Brak użytkowników do wyświetlenia.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">ID</TableHead>
          <TableHead>Imię</TableHead>
          <TableHead className="text-center">Nazwisko</TableHead>
          <TableHead className="text-center">Kontynent</TableHead>
          <TableHead className="text-center">Data urodzenia</TableHead>
          <TableHead className="w-6"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map(({ birthDate, continent, lastName, name, id }, index) => (
          <TableRow
            className={clsx(index % 2 === 0 && "bg-oceanic text-white")}
            key={id}
          >
            <TableCell>{id}</TableCell>
            <TableCell className="max-w-[7rem] truncate">{name}</TableCell>
            <TableCell className="text-center max-w-[7rem] truncate">
              {getDisplayValue(lastName)}
            </TableCell>
            <TableCell className="text-center">
              {getDisplayValue(continent)}
            </TableCell>
            <TableCell className="text-center">
              {birthDate ? format(birthDate, "dd-MM-yyyy") : "-"}
            </TableCell>
            <TableCell>
              <button
                onClick={() => {
                  onDeleteUser(id);
                }}
                className={clsx("h-6 w-6 cursor-pointer hover:opacity-25 flex")}
                aria-label="Delete user"
              >
                <Trash2Icon />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserDataTable;
