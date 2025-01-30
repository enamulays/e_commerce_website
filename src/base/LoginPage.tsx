"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/api/loginApi";
import ButtonLoader from "@/components/ButtonLoader";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useUserQuery } from "@/api/userApi";

export default function LoginPage() {
  const router = useRouter();
  const { refetch } = useUserQuery({});
  const [login, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [passwordToggle, setPasswordToggle] = useState(true);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "rakibays1@gmail.com",
      password: "Rakibays1@",
    },
  });

  async function onSubmit(data: { email: string; password: string }) {
    try {
      const response = await login(data).unwrap();
      toast.success(response.message);
      setErrorMessage("");
      router.push("/");
      reset();
      refetch();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("login failed");
      const err = error as { data?: { message?: string } };
      setErrorMessage(err?.data?.message || "An unexpected error occured");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <Card className="w-full max-w-md rounded-sm border-gray-400 shadow-lg shadow-gray-400">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="Enter email address"
                  required
                  autoComplete="email"
                  className="rounded-none border-skyColor/50"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type={passwordToggle ? "password" : "text"}
                    required
                    autoComplete="current-password"
                    className="rounded-none border-skyColor/50"
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
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="checked:bg-red-500"
                  id="rememberMe"
                />
                <Label htmlFor="rememberMe" className="!ml-0 mx-0 pl-2">
                  Remember me
                </Label>
              </div>
              {errorMessage && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-orange-600 rounded-none hover:bg-orange-700"
                disabled={isLoading}
              >
                {isLoading ? <ButtonLoader /> : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-600">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="text-sm text-center text-gray-600">
            {"Don't have an account? "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
