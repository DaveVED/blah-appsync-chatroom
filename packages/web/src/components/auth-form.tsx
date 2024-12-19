import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthLoginForm } from "@/components/auth-login-form";
import { AuthSignupForm } from "@/components/auth-signup-form";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "./auth-provider";

export const AuthForm = ({ hideButton = false }) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = React.useState<"login" | "signup">("login");
  const [isOpen, setIsOpen] = React.useState(false);
  const { signup, login} = useAuth();
  
  const onSwitchToSignup = () => {
    setActiveTab("signup");
  };

  const handleSubmit = async (data: any) => {
    console.log("Form submitted with data:", data);

    // Simulate an API call
    /*const response = await signup({
        username: data.username,
        email: data.email,
        password: data.password,
        termsAccepted: data.termsAccepted
    });*/
    const response = await login({
        usernameOrEmail: data.username,
        password: data.word
    })
  };

  const authButton = hideButton ? null : (
    <Button
      variant="outline"
      className="w-full h-12 hover:bg-black hover:text-white transition-colors"
    >
      <LogIn className="mr-2 h-4 w-4" />
      Login / Sign Up
    </Button>
  );

  const authContent = (
    <Tabs
      defaultValue={activeTab}
      onValueChange={(value) => setActiveTab(value as "login" | "signup")}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <AuthLoginForm
          onSubmit={handleSubmit}
          onLoginRedirect={onSwitchToSignup}
        />
      </TabsContent>
      <TabsContent value="signup">
        <AuthSignupForm
          onSubmit={handleSubmit}
          onSwitchToLogin={onSwitchToSignup}
        />
      </TabsContent>
    </Tabs>
  );

  return (
    <React.Fragment>
      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>{authButton}</SheetTrigger>
          <SheetContent side="bottom" className="h-[90%] overflow-y-auto">
            {authContent}
          </SheetContent>
        </Sheet>
      ) : (
        <Popover>
          <PopoverTrigger asChild>{authButton}</PopoverTrigger>
          <PopoverContent
          
  className="ml-2 w-[80%] max-w-lg max-h-[73vh] overflow-y-auto"
  style={{ width: '400px' }}
>
  {authContent}
</PopoverContent>


        </Popover>
      )}
    </React.Fragment>
  );
};
