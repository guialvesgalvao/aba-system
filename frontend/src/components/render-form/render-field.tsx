import {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "../ui/form";
import { cn } from "@/lib/utils";

interface RenderFieldReturn<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
}

interface IRenderFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  className?: string;

  control: Control<TFieldValues>;
  name: TName;
  render: (props: RenderFieldReturn<TFieldValues, TName>) => JSX.Element;

  label?: string;
  description?: string;
  required?: boolean;
}

export function RenderField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: IRenderFieldProps<TFieldValues, TName>) {
  const { className, control, label, name, render, description, required } =
    props;

  return (
    <FormField
      control={control}
      name={name}
      render={(field) => (
        <FormItem className={cn("w-full", className)}>
          {label && (
            <FormLabel htmlFor={name} required={required}>
              {label}
            </FormLabel>
          )}
          <FormControl>{render(field)}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
