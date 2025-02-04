import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { twMerge } from "tailwind-merge";

interface Props {
  clasName?: string;
  value?: string;
  disabled?: boolean;
  label?: string;
  placeholder: string;
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
}

function SelectTagItem({
  children,
  clasName,
  value,
  disabled,
  label,
  placeholder,
  onValueChange,
}: Props) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={twMerge("w-full rounded-none ", clasName)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {children}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectTagItem;
