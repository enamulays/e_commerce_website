"use client";

import SelectTagItem from "@/components/SelectTagItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import coutryDivisions from "@/constants/countryDivisions.json";
import { SelectItem } from "@/components/ui/select";
import { District } from "@/type_local";
import CustomButton from "@/components/CustomButton";
import { FaHome } from "react-icons/fa";
import { PiBuildingOfficeFill } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { useUpdateAddressMutation, useUserQuery } from "@/api/userApi";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/ButtonLoader";

interface InputProps {
  fullname: string;
  number: string;
  address: string;
}

function UserAddress() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedUpazila, setSelectedUpazila] = useState<string>("");
  const [districts, setDistricts] = useState<District[] | undefined>([]);
  const [upazilas, setUpazilas] = useState<string[] | undefined>([]);
  const [areaStatus, setAreaStatus] = useState<string>("");
  const { data: user } = useUserQuery({});
  const [updateAddress] = useUpdateAddressMutation();
  const [buttonLoader, setButtonLoader] = useState(false);

  const { handleSubmit, register } = useForm<InputProps>({
    defaultValues: {
      fullname: user?.user?.addressDetails.fullname,
      number: user?.user?.addressDetails.number,
      address: user?.user?.addressDetails.address,
    },
  });

  const onSubmit = async (data: InputProps) => {
    try {
      const response = await updateAddress({
        ...data,
        division: selectedDivision,
        district: selectedDistrict,
        upazila: selectedUpazila,
        areaStatus: areaStatus,
      }).unwrap();
      toast.success(response.message);
      setIsEditing(false);
      setButtonLoader(true);
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message);
      console.error(error);
    } finally {
      setButtonLoader(false);
    }
  };

  const handleDivisionChange = (value: string) => {
    setSelectedDivision(value);
    setSelectedDistrict("");
    const divisionDistrictFind = coutryDivisions.find((d) => d.name === value);
    setDistricts(divisionDistrictFind?.districts);
    setUpazilas([]);
  };

  const handleDistricChange = useCallback(
    (value: string) => {
      setSelectedDistrict(value);
      setSelectedUpazila("");
      const distrcitUpazilaFind = districts?.find((d) => d.name === value);
      setUpazilas(distrcitUpazilaFind?.upazilas);
    },
    [districts]
  );

  useEffect(() => {
    const address = user?.user?.addressDetails;
    if (!selectedDivision) {
      handleDivisionChange(address?.division);
    } else if (!selectedDistrict) {
      handleDistricChange(address?.district);
    }
    if (!areaStatus) {
      setAreaStatus(address?.areaStatus);
    }
    setIsLoading(false);
  }, [
    user,
    isLoading,
    selectedDivision,
    selectedDistrict,
    areaStatus,
    handleDistricChange,
  ]);

  // useEffect(() => {
  //   if (!selectedUpazila) {
  //     setSelectedUpazila(user?.user?.addressDetails?.upazila);
  //   }
  //   console.log(selectedUpazila);
  // }, [selectedUpazila, user?.user?.addressDetails?.upazila]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="py-10">
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            User Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="grid gap-2 relative">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  type="text"
                  {...register("fullname")}
                  disabled={!isEditing}
                  className={`${
                    isEditing
                      ? "text-gray-900 border-skyColor/70 rounded-none"
                      : ""
                  }`}
                />
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="number">Phone Number</Label>
                <Input
                  id="number"
                  type="text"
                  {...register("number")}
                  disabled={!isEditing}
                  className={`${
                    isEditing
                      ? "text-gray-900 border-skyColor/70 rounded-none"
                      : ""
                  }`}
                />
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  {...register("address")}
                  disabled={!isEditing}
                  className={`${
                    isEditing
                      ? "text-gray-900 border-skyColor/70 rounded-none"
                      : ""
                  }`}
                />
              </div>
              <div className="grid gap-2 relative">
                <Label>Region/Division</Label>
                <SelectTagItem
                  value={selectedDivision}
                  clasName={`${isEditing ? "border-skyColor/70" : ""}`}
                  placeholder="Choose your region/division"
                  disabled={!isEditing}
                  label="Division"
                  onValueChange={(value) => handleDivisionChange(value)}
                >
                  {coutryDivisions.map((division, index) => (
                    <SelectItem key={index} value={division.name}>
                      {division.name}
                    </SelectItem>
                  ))}
                </SelectTagItem>
              </div>
              <div className="grid gap-2 relative">
                <Label>District</Label>
                <SelectTagItem
                  clasName={`${isEditing ? "border-skyColor/70" : ""}`}
                  placeholder="Choose your district"
                  label="District"
                  disabled={!selectedDivision || !isEditing}
                  value={selectedDistrict}
                  onValueChange={(value) => handleDistricChange(value)}
                >
                  {districts?.map((district, index) => (
                    <SelectItem key={index} value={district.name}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectTagItem>
              </div>
              <div className="grid gap-2 relative">
                <Label>Upazila</Label>
                <SelectTagItem
                  clasName={`${isEditing ? "border-skyColor/70" : ""}`}
                  placeholder="Choose your upazila"
                  label="Upazila"
                  disabled={!selectedDistrict || !isEditing}
                  value={selectedUpazila}
                  onValueChange={(value) => setSelectedUpazila(value)}
                >
                  {upazilas?.map((upazila, index) => (
                    <SelectItem key={index} value={upazila}>
                      {upazila}
                    </SelectItem>
                  ))}
                </SelectTagItem>
              </div>
            </div>

            <div className="mt-12 grid gap-2">
              <p>Select a label for effective delivery:</p>
              <div className="flex items-center gap-4">
                <button
                  className={`${
                    isEditing ? "hover:bg-themeColor  hover:text-white" : ""
                  } ${
                    areaStatus == "Home" ? "bg-themeColor  text-white" : ""
                  } duration-200  border-themeColor shadow-themeColor shadow-md px-6
                  flex items-center py-2 border gap-2 rounded-sm`}
                  disabled={!isEditing}
                  type="button"
                  onClick={() => setAreaStatus("Home")}
                >
                  <FaHome />
                  Home
                </button>
                <button
                  className={`${
                    isEditing ? "hover:bg-green-600 hover:text-white" : ""
                  } ${
                    areaStatus == "Office" ? "bg-green-600  text-white" : ""
                  } duration-200  border-green-600 shadow-green-600 shadow-md px-6
                  flex items-center py-2 border gap-2 rounded-sm`}
                  disabled={!isEditing}
                  type="button"
                  onClick={() => setAreaStatus("Office")}
                >
                  <PiBuildingOfficeFill />
                  Office
                </button>
              </div>
            </div>
            <div className="mt-12 flex justify-end gap-6">
              {isEditing ? (
                <div className="flex justify-end gap-4 ">
                  <CustomButton
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 rounded-md hover:bg-gray-400 
                    py-2 px-12 hover:text-black"
                  >
                    Cancel
                  </CustomButton>
                  <Button type="submit" className="px-12">
                    {buttonLoader ? <ButtonLoader /> : "Save"}
                  </Button>
                </div>
              ) : (
                <CustomButton
                  className="bg-orange-600 py-2 rounded-md hover:bg-orange-500 text-white border-orange-600"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Address
                </CustomButton>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserAddress;
