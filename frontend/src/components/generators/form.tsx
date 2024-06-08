import { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FieldGenerator, { FormTypes } from "./field";

type FormFieldProps = {
  name: string;
  type: FormTypes;
  label: string;
  description: string;
  button?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

type FormRowProps = {
  name: string;
  fields: Array<FormFieldProps>;
};

export interface FormGeneratorProps<T extends any> {
  form: UseFormReturn<T, any, undefined>;

  rows: Array<FormRowProps>;

  onSubmit: (data: T) => void;
}

function FormGenerator<T>(props: FormGeneratorProps<T>) {
  const { form, rows, onSubmit } = props;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {rows?.map((row, index) => {
          const { name, fields } = row;

          return (
            <div key={index} className="flex gap-6 grow flex-wrap" id={"row-" + name}>
              {fields?.map((field) => {
                return <FieldGenerator form={form} {...field} />;
              })}
            </div>
          );
        })}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default FormGenerator;
