import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import clsx from "clsx";

const mockedData: {
  name: string;
  lastName: string;
  birthDate: string;
  continent: string;
  id: number;
}[] = [
  {
    name: "John",
    lastName: "Doe",
    birthDate: "1990-01-15",
    continent: "North America",
    id: 1,
  },
  {
    name: "Jane",
    lastName: "Smith",
    birthDate: "1985-07-22",
    continent: "Europe",
    id: 2,
  },
  {
    name: "Juan",
    lastName: "Perez",
    birthDate: "1992-03-10",
    continent: "South America",
    id: 3,
  },
  {
    name: "Maria",
    lastName: "Garcia",
    birthDate: "1988-11-05",
    continent: "Europe",
    id: 4,
  },
  {
    name: "Aisha",
    lastName: "Khan",
    birthDate: "1995-04-25",
    continent: "Asia",
    id: 5,
  },
  {
    name: "Paul",
    lastName: "Brown",
    birthDate: "1980-12-30",
    continent: "Africa",
    id: 6,
  },
  {
    name: "Emma",
    lastName: "Wilson",
    birthDate: "1987-09-14",
    continent: "Australia",
    id: 7,
  },
  {
    name: "Hans",
    lastName: "Müller",
    birthDate: "1991-02-28",
    continent: "Europe",
    id: 8,
  },
  {
    name: "Fatima",
    lastName: "Zahra",
    birthDate: "1996-08-19",
    continent: "Africa",
    id: 9,
  },
  {
    name: "Chen",
    lastName: "Li",
    birthDate: "1993-06-18",
    continent: "Asia",
    id: 10,
  },
];

const UserDataTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Imię</TableHead>
          <TableHead>Nazwisko</TableHead>
          <TableHead>Kontynent</TableHead>
          <TableHead className="text-right">Data urodzenia</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockedData.map(
          ({ birthDate, continent, lastName, name, id }, index) => (
            <TableRow
              className={clsx(index % 2 === 0 && "bg-oceanic text-white")}
              key={id}
            >
              <TableCell>{name}</TableCell>
              <TableCell>{lastName}</TableCell>
              <TableCell>{continent}</TableCell>
              <TableCell className="text-right">{birthDate}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

export default UserDataTable;
