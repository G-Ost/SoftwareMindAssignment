import UserDataTable from "./UserDataTable";
import UserRegisterForm from "./UserRegisterForm";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcn/components/ui/tabs";

const MainContentContainer = () => {
  return (
    <div className="w-[40rem] max-h-[44rem] h-[34rem] overflow-y-auto bg-softBlue rounded-xl p-6 border-2 border-black border-solid">
      <Tabs
        defaultValue="userRegister"
        className="h-full relative flex flex-col"
      >
        <TabsList className="w-full justify-around mb-4">
          <TabsTrigger value="userRegister">Rejestracja</TabsTrigger>
          <TabsTrigger value="usersTable">Użytkownicy</TabsTrigger>
        </TabsList>
        <TabsContent value="userRegister" className="h-full">
          <UserRegisterForm />
        </TabsContent>
        <TabsContent value="usersTable" className="h-full">
          <UserDataTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainContentContainer;
