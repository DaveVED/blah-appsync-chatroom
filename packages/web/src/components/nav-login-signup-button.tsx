import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { LogIn } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AuthForm } from './auth-form';
import { AuthLoginForm } from './auth-login-form';

export const NavLoginSignupButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          className="w-full justify-center py-6 bg-white text-black hover:bg-black hover:text-white mb-4"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Log In / Sign Up
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <AuthLoginForm />
      </PopoverContent>
    </Popover>
  );
};
