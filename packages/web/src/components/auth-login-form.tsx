import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthBanner } from "./auth-banner";

const schema = z.object({
  usernameOrEmail: z
    .string()
    .min(3, "Username or email must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type FormValues = z.infer<typeof schema>;

interface AuthLoginFormProps {
  onLoginRedirect: () => void;
  onSubmit: (data: FormValues) => Promise<void>;
}

export function AuthLoginForm({
  onLoginRedirect,
  onSubmit,
}: AuthLoginFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const handleAuthSubmit = async (data: FormValues) => {
    console.log(`test  ${data}`);
    await onSubmit(data);
    form.reset();
  };

  return (
    <div className="flex flex-col gap-4 w-full px-2 sm:px-0">
                <AuthBanner />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAuthSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="usernameOrEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">
                  Username
                </FormLabel>
                <FormControl>
                  <Input {...field} className="h-9 text-sm" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">
                  Password
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} className="h-9 text-sm" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full h-10 text-sm">
            Sign Up
          </Button>
        </form>
      </Form>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button variant="outline" className="w-full h-10 text-sm" disabled={true}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-4 w-4 mr-2"
        >
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            fill="currentColor"
          />
        </svg>
        Sign up with GitHub
      </Button>

      <div className="text-center text-xs mt-2">
        Already have an account?{" "}
        <button
          onClick={onLoginRedirect}
          className="italic underline underline-offset-4 decoration-dotted hover:text-primary transition-colors"
        >
          Signup
        </button>
      </div>
    </div>
  );
}