import UserDataTable from "./UserDataTable";
import UserRegisterForm from "./UserRegisterForm";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcn/components/ui/tabs";
import UserSearchForm from "./UserSearchForm";

const MainContentContainer = () => {
  return (
    <div className="w-[43rem] h-[36rem] min-h-[36rem] overflow-y-auto bg-softBlue rounded-xl p-6 border-2 border-black border-solid">
      <Tabs
        defaultValue="userRegister"
        className="h-full relative flex flex-col"
      >
        <TabsList className="w-full justify-around mb-4 gap-1">
          <TabsTrigger value="userRegister">Rejestracja</TabsTrigger>
          <TabsTrigger value="usersTable">Użytkownicy</TabsTrigger>
          <TabsTrigger value="userSearch">Szukaj</TabsTrigger>
        </TabsList>
        <TabsContent value="userRegister" className="h-full">
          <UserRegisterForm />
        </TabsContent>
        <TabsContent value="usersTable" className="h-full">
          <UserDataTable />
        </TabsContent>
        <TabsContent value="userSearch" className="h-full">
          <UserSearchForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainContentContainer;
