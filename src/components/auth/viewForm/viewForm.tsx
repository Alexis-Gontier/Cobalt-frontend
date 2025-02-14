import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateAccount, updatePassword } from "@/api/account";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Use a valid email address" }),
  password: z.string().min(8, { message: "At least 8 characters needed" }),
});

export const ViewForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const userFirstName = localStorage.getItem("firstname") as string;
  const userLastName = localStorage.getItem("lastname");
  const userEmail = localStorage.getItem("email");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [NpasswordVisible, setNPasswordVisible] = useState(false);

  useEffect(() => {
    form.reset({
      firstName: userFirstName,
      lastName: userLastName ?? "",
      email: userEmail ?? "",
    });
  }, [form, userFirstName, userLastName, userEmail]);

  const hModifyAccount = async (data: z.infer<typeof formSchema>) => {
    try {
      const result = await updateAccount({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
      console.log("Compte mis à jour :", result);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du compte :", error);
    }
  };

  const hModifyPassword = async (data: z.infer<typeof formSchema>) => {
    try {
      const result = await updatePassword({
        current: data.password,
        new: "nouveauMotDePasse", // Remplacez par la nouvelle valeur du mot de passe
      });
      console.log("Mot de passe mis à jour :", result);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe :", error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleNPasswordVisibility = () => {
    setNPasswordVisible(!NpasswordVisible);
  };

  return (
    <div className="flex justify-center mt-30 min-h-screen">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" {...form.register("firstName")} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" {...form.register("lastName")} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...form.register("email")} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={form.handleSubmit(hModifyAccount)}>
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">New password</Label>
                <div className="flex items-center h-fit ">
                  <Input
                    id="current"
                    type={passwordVisible ? "text" : "password"}
                    {...form.register("password")}
                    className="h-12 m-0 rounded-r-none"
                  />
                  <Button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="h-12 w-12 rounded-l-none"
                  >
                    {passwordVisible ? <Eye /> : <EyeOff />}
                  </Button>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Confirm new password</Label>
                <div className="flex items-center ">
                  <Input
                    id="current"
                    type={NpasswordVisible ? "text" : "password"}
                    className="h-12 m-0 rounded-r-none"
                  />
                  <Button
                    type="button"
                    onClick={toggleNPasswordVisibility}
                    className="h-12 w-12 rounded-l-none"
                  >
                    {NpasswordVisible ? <Eye /> : <EyeOff />}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={form.handleSubmit(hModifyPassword)}>
                Save password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
