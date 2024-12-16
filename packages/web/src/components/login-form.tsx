import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InfoIcon } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/components/auth-provider"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export function LoginForm({ isSidebar = false }: { isSidebar?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const { login } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await login(values.email, values.password);
    setIsOpen(false);
  }

  const loginForm = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
        <Alert className="mt-4 px-4">
          <InfoIcon className="h-4 w-4" />
          <AlertDescription className="text-xs">
            This is basic auth. If the email/password does not exist, one will be created.
          </AlertDescription>
        </Alert>
      </form>
    </Form>
  );

  const loginButton = (
    <Button 
      onClick={() => setIsOpen(true)} 
      variant={isSidebar ? "outline" : "default"}
      className={`${isSidebar ? 'w-full bg-white hover:bg-black hover:text-white' : ''}`}
    >
      Login
    </Button>
  );

  if (isSidebar) {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          {loginButton}
        </PopoverTrigger>
        <PopoverContent className="w-80">
          {loginForm}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div>
      {isOpen ? loginForm : loginButton}
    </div>
  );
}

