"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const formSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(15)
    .trim()
    .refine((value) => value.trim() !== "", {
      message: "Tên phòng họp không được để trống",
    }),
  password: z
    .string()
    .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự")
    .max(12, "Mật khẩu không được vượt quá 12 ký tự")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/,
      "Mật khẩu bắt buộc phải chứa ký tự in hoa, in thường, số và ký tự đặc biệt"
    ),
});

export default function LoginPage() {
  const router = useRouter();
  const [signInRes, setSignInRes] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof formSchema>) => {
      try {
        const loginResult = await signIn("login-cred", {
          username: values.username,
          password: values.password,
          redirect: false,
        });

        if (loginResult?.error) {
          toast.error(`${decodeURIComponent(loginResult.error)}`);
          router.refresh();
        } else {
          setSignInRes(true);
        }
      } catch (error) {
        console.log("error login ====", error);
      }
    }
  );

  useEffect(() => {
    if (signInRes) return router.push("/");
  }, [signInRes]);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login project.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action="">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Username" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center mt-3">
                <Button type="submit" onClick={onSubmit}>
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
