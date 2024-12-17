import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormFieldInputProps<T extends FieldValues> {
  control: Control<T>; // react-hook-form's Control
  name: Path<T>; // Ensures name matches keys of form values
  type?: string; // Input type (text, password, etc.)
  placeholder?: string;
}

export const FormFieldInput = <T extends FieldValues>({
  control,
  name,
  type = "text",
  placeholder,
}: FormFieldInputProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Input type={type} placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
