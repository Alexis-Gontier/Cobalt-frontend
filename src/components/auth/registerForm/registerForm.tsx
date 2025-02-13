import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { register as registerUser } from "@/api/auth";

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Use a valid email address" }),
    password: z.string().min(8, { message: "At least 8 characters needed" }),
    confirmPassword: z.string().min(8, { message: "Should match the password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const RegisterForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const registerData = {
        firstname: values.firstName,
        name: values.lastName,
        email: values.email,
        password: values.password,
      };
      const data = await registerUser(registerData)
      console.log("Réponse du serveur:", data)
      localStorage.setItem("token", data.access_token)
      navigate("/")
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-[380px]"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create an account.</h1>
          <p className="text-sm text-muted-foreground">
            Enter your information below to create an account
          </p>
        </div>
        <div className="grid gap-8">
          <div className="grid">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-end justify-between">
                    <FormLabel htmlFor="email" className="font-semibold">
                      Email
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="your@email.com"
                      className={cn(
                        form.formState.errors.email &&
                          "border-destructive focus-visible:ring-destructive"
                      )}
                      autoComplete="email"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-end justify-between">
                    <FormLabel htmlFor="firstName" className="font-semibold">
                      First Name
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Your First Name"
                      className={cn(
                        form.formState.errors.firstName &&
                          "border-destructive focus-visible:ring-destructive"
                      )}
                      autoComplete="given-name"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-end justify-between">
                    <FormLabel className="font-semibold">
                      Last Name
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Your Last Name"
                      className={cn(
                        form.formState.errors.lastName &&
                          "border-destructive focus-visible:ring-destructive"
                      )}
                      autoComplete="family-name"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-end justify-between">
                    <FormLabel htmlFor="password" className="font-semibold">
                      Password
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Enter your password"
                      className={cn(
                        form.formState.errors.password &&
                          "border-destructive focus-visible:ring-destructive"
                      )}
                      autoComplete="new-password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-end justify-between">
                    <FormLabel htmlFor="confirmPassword" className="font-semibold">
                      Confirm Password
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Confirm your password"
                      className={cn(
                        form.formState.errors.confirmPassword &&
                          "border-destructive focus-visible:ring-destructive"
                      )}
                      autoComplete="new-password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="h-12">
            Register
          </Button>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <a href="/auth/login" className="underline underline-offset-4">
            Sign in
          </a>
        </div>
      </form>
    </Form>
  );
};
