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
import { login } from "@/api/auth";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Email is required" })
    .min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = await login(values.email, values.password);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("firstname", data.user.firstname);
      localStorage.setItem("lastname", data.user.name);
      localStorage.setItem("password", data.user.password);

      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-[380px]"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login.</h1>
          <p className="text-sm text-muted-foreground">
            Enter your information below to login
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-4">
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
          </div>
          <Button type="submit" className="h-12">
            Login
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/auth/register" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </form>
    </Form>
  );
};
