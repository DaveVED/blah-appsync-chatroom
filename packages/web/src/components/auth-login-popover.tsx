import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { LogIn } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const AuthLoginPopover = () => {
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
      <PopoverContent className=" mb-8">
        testttttttttttttttt
      </PopoverContent>
    </Popover>
  );
};

