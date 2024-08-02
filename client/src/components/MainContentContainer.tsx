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
    <div className="w-[40rem] max-h-[44rem] min-h-[34rem] overflow-y-auto bg-softBlue rounded-xl p-6 border-2 border-black border-solid flex flex-col">
      <Tabs defaultValue="userRegister" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-around mb-4">
          <TabsTrigger value="userRegister">Rejestracja</TabsTrigger>
          <TabsTrigger value="usersTable">Użytkownicy</TabsTrigger>
        </TabsList>
        <TabsContent value="userRegister" className="flex flex-1 relative">
          <UserRegisterForm />
        </TabsContent>
        <TabsContent value="usersTable">
          <UserDataTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainContentContainer;
