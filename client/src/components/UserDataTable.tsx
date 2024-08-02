import { User } from "@/lib/userService";
import { fetcher, getTableValue } from "@/lib/utils";
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
import swr from "swr";
import LoadingSpinner from "./common/LoadingSpinner";

const UserDataTable = () => {
  const { data: users, isLoading, error } = swr<User[]>("/api/form", fetcher);

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
          <TableHead>Imię</TableHead>
          <TableHead className="text-center">Nazwisko</TableHead>
          <TableHead className="text-center">Kontynent</TableHead>
          <TableHead className="text-right">Data urodzenia</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map(({ birthDate, continent, lastName, name, id }, index) => (
          <TableRow
            className={clsx(index % 2 === 0 && "bg-oceanic text-white")}
            key={id}
          >
            <TableCell>{name}</TableCell>
            <TableCell className="text-center">
              {getTableValue(lastName)}
            </TableCell>
            <TableCell className="text-center">
              {getTableValue(continent)}
            </TableCell>
            <TableCell className="text-right">
              {birthDate ? format(birthDate, "dd-MM-yyyy") : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserDataTable;
