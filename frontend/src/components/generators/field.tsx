import { UseFormReturn } from "react-hook-form";

import { Button } from "../ui/button";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";

import { Input } from "../ui/input";

export type FormTypes = "text" | "number";

interface FieldGeneratorProps<T> {
  form: UseFormReturn<T, any, undefined>;
  name: string;
  type: FormTypes;
  label: string;
  description: string;
  button?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

function FieldGenerator<T>(props: FieldGeneratorProps<T>) {
  const { form, ...input } = props;

  const { name, description, label, button } = input;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>

          <div className="flex items-center gap-4">
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            {button && <Button {...button} />}
          </div>

          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FieldGenerator;
