import UserRegisterForm from "./UserRegisterForm";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcn/components/ui/tabs";

const MainContentContainer = () => {
  return (
    <div className="w-[500px] h-[500px] bg-softBlue rounded-xl p-6">
      <Tabs defaultValue="userRegister">
        <TabsList className=" w-full justify-around ">
          <TabsTrigger value="userRegister">Rejestracja</TabsTrigger>
          <TabsTrigger value="usersTable">Użytkownicy</TabsTrigger>
        </TabsList>
        <TabsContent value="userRegister">
          <UserRegisterForm />
        </TabsContent>
        <TabsContent value="usersTable">Lorem ipsum</TabsContent>
      </Tabs>
    </div>
  );
};

export default MainContentContainer;
