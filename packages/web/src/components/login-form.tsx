import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus } from "lucide-react";
import { FormFieldInput } from "@/components/form-field-input";
import { TermsOfServiceHover } from "@/components/terms-of-service-hover";

const baseSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
});

const signupSchema = baseSchema
  .extend({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
    username: z
      .string({ required_error: "Username is required" })
      .min(3, "Username must be at least 3 characters"),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
    termsAccepted: z
      .boolean()
      .refine((val) => val, "You must accept the terms of service"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const loginSchema = baseSchema.extend({
  emailOrUsername: z
    .string({ required_error: "Email or Username is required" })
    .min(1, "Email or Username is required"),
});

export const LoginForm: React.FC = (): JSX.Element => {
  const { isLoggedIn, login, signup } = useAuth();
  const [isSignUp, setIsSignUp] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const schema = isSignUp ? signupSchema : loginSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      emailOrUsername: "",
      termsAccepted: false,
    },
  });

  const { reset } = form;

  const handleAuthSubmit = async (values: any) => {
    setErrorMessage(null);
    try {
      if (isSignUp) {
        const { email, username, password, confirmPassword, termsAccepted } =
          values;
        await signup(email, username, password, confirmPassword, termsAccepted);
      } else {
        const { emailOrUsername, password } = values;
        await login(emailOrUsername, password);
      }
    } catch (error) {
      setErrorMessage(
        isSignUp ? "Failed to create account." : "Failed to login.",
      );
      reset(); // Clear form fields
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full gap-2 bg-background hover:bg-accent hover:text-accent-foreground"
        >
          <UserPlus className="h-4 w-4" />
          <span>Account</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="mx-2 max-w-[400px]">
        <Card className="w-full border-none shadow-none">
          <CardHeader>
            <CardTitle>{isSignUp ? "Create Account" : "Login"}</CardTitle>
            <CardDescription>
              {isSignUp
                ? "Sign up for a new account"
                : "Enter your email/username and password to login"}
            </CardDescription>
          </CardHeader>

          {errorMessage && (
            <div className="mb-4 rounded-md bg-red-100 p-2 text-red-600 text-sm">
              {errorMessage}
            </div>
          )}

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleAuthSubmit)}
                className="space-y-4"
              >
                {isSignUp && (
                  <>
                    <FormFieldInput
                      control={form.control}
                      name="email"
                      type="email"
                      placeholder="Email"
                    />
                    <FormFieldInput
                      control={form.control}
                      name="username"
                      placeholder="Username"
                    />
                  </>
                )}
                {!isSignUp && (
                  <FormFieldInput
                    control={form.control}
                    name="emailOrUsername"
                    placeholder="Email or Username"
                  />
                )}
                <FormFieldInput
                  control={form.control}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                {isSignUp && (
                  <>
                    <FormFieldInput
                      control={form.control}
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                    />
                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <span className="text-sm text-gray-500">
                              <TermsOfServiceHover />
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <Button type="submit" className="w-full">
                  {isSignUp ? "Sign Up" : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter>
            <Button
              variant="link"
              className="w-full text-sm italic underline underline-dotted"
              onClick={() => setIsSignUp((prev) => !prev)}
            >
              {isSignUp
                ? "Already have an account? Login"
                : "Create a new account"}
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
