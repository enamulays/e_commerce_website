"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateUserMutation, useUserQuery } from "@/api/userApi";
import Loader from "@/components/Loader";
import { useForm } from "react-hook-form";
import ButtonLoader from "@/components/ButtonLoader";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserProfilePage(): React.ReactElement {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const { data: userData, isLoading, isError } = useUserQuery({});
  const [updateUser] = useUpdateUserMutation();
  const router = useRouter();
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
  });

  interface FormData {
    name: string;
    email: string;
    mobile: string;
    birthday: string;
    gender: string;
  }

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: inputValue.name,
      email: inputValue.email,
      mobile: inputValue.mobile,
    },
  });

  const onSubmit = async (data: {
    name: string;
    email: string;
    mobile: string;
    birthday: string;
  }) => {
    try {
      setUpdateLoading(true);
      const response = await updateUser({
        ...data,
        gender: inputValue.gender,
      }).unwrap();
      toast.success(response.message);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Something went wrong");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleViewCart = () => {
    router.push("/cart");
  };

  const handleViewOrders = () => {
    router.push("/orders");
  };

  useEffect(() => {
    if (!isLoading && userData && !inputValue.name) {
      const newInputValue = {
        name: userData.user.name,
        email: userData.user.email,
        mobile: userData.user.mobile,
        gender: userData.user.gender,
        birthday: userData.user.birthday,
      };
      reset(newInputValue);
      setInputValue(newInputValue);
    }
  }, [setInputValue, isLoading, userData, reset, inputValue.name]);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <div className="text-center text-red-500">
        Failed to fetch user data. Please try again later.
      </div>
    );
  }
  console.log(userData.user);
  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            User Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage
                src={userData.user.avatar || "/user-avater.png"}
                alt={userData.user.name || userData.user.username}
                onError={(e) => (e.currentTarget.src = "/user-avater.png")}
              />
              <AvatarFallback>
                {userData.user.name?.[0] || userData.user.username[0]}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{userData.user.username}</h2>
            <p className="text-sm text-orange-600">{userData.user.role}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  disabled={!isEditing}
                  className={`${
                    isEditing
                      ? "text-gray-900 border-skyColor/70 rounded-none"
                      : ""
                  }`}
                />
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Email is not valid",
                    },
                  })}
                  type="email"
                  disabled
                  className={`${
                    isEditing
                      ? "text-gray-900 border-skyColor/70 rounded-none"
                      : ""
                  }`}
                />
                <button
                  className="text-themeColor hover:text-themeColor/80 duration-200 
                  underline text-sm absolute right-2 top-7"
                >
                  change
                </button>
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  id="mobile"
                  {...register("mobile", {
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "Mobile number must be 11 digits",
                    },
                  })}
                  type="tel"
                  disabled={!isEditing}
                  className={`${
                    isEditing
                      ? "text-gray-900 border-skyColor/70 rounded-none"
                      : ""
                  }`}
                />
                {errors.mobile && (
                  <p className="text-xs text-red-500">
                    {errors.mobile.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="birthday">Birthday</Label>
                  <Input
                    id="birthday"
                    type="date"
                    {...register("birthday")}
                    disabled={!isEditing}
                    className={`rounded-none ${
                      isEditing ? "border-skyColor/70" : ""
                    }`}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="birthday">Birthday</Label>
                  <Select
                    value={inputValue.gender}
                    onValueChange={(value) =>
                      setInputValue({ ...inputValue, gender: value })
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger
                      className={`w-full rounded-none ${
                        isEditing ? "border-skyColor/70" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select a Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-700">
                  <span className="text-gray-950">Email verified:</span>{" "}
                  {userData.user.verify_email ? "Yes" : "No"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="text-gray-950">Status:</span>{" "}
                  {userData.user.status}
                </p>
              </div>
              {isEditing ? (
                <Button
                  type="submit"
                  disabled={updateLoading}
                  className="rounded-none"
                >
                  {updateLoading ? <ButtonLoader /> : "Save Changes"}
                </Button>
              ) : (
                <button
                  type="button"
                  className="bg-orange-700 hover:bg-orange-700/90 py-[6px] text-white duration-200"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              className="border-skyColor/50"
              onClick={handleViewCart}
            >
              View Cart
            </Button>
            <Button
              variant="outline"
              className="border-skyColor/50"
              onClick={handleViewOrders}
            >
              View Orders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
