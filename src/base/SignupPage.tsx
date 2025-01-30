"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ButtonLoader from "@/components/ButtonLoader";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { signupSchemaForm } from "@/lib/signupSchemaForm";
import { useSignupMutation } from "@/api/signupApi";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [passwordToggle, setPasswordToggle] = useState<boolean>(true);
  const [signup, { isLoading }] = useSignupMutation();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchemaForm),
    defaultValues: {
      username: "rakibays1",
      email: "rakibays1@gmail.com",
      password: "Rakibays1@",
    },
  });

  async function onSubmit(data: {
    username: string;
    email: string;
    password: string;
  }) {
    try {
      const response = await signup(data).unwrap();
      toast.success(
        `${response.message}, please login` || "Signup successfull"
      );
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      console.error(error);
      const err = error as { data?: { message?: string } };
      alert(err?.data?.message || "An error occurred during signup");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[90vh] ">
      <Card className="w-full max-w-md rounded-sm border-gray-400 shadow-lg shadow-gray-400">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="username"
                  required
                  className="border-skyColor rounded-none"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-xs text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="border-skyColor rounded-none"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={passwordToggle ? "password" : "text"}
                    required
                    className="border-skyColor rounded-none"
                    {...register("password")}
                  />
                  <button
                    className="absolute right-[4px] bottom-[7px]"
                    type="button"
                    onClick={() => setPasswordToggle(!passwordToggle)}
                  >
                    {passwordToggle ? (
                      <IoEyeOffOutline size={20} />
                    ) : (
                      <IoEyeOutline size={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-orange-600 rounded-none hover:bg-orange-700"
                disabled={isLoading}
              >
                {isLoading ? <ButtonLoader /> : "Sign up"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
