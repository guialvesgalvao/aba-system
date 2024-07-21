import { zodResolver } from "@hookform/resolvers/zod";
import {
  UseFormReturn,
  DefaultValues,
  FieldValues,
  FieldErrors,
  useForm,
} from "react-hook-form";
import { ZodType } from "zod";

import { Form } from "../ui/form";

interface IRenderFormProps<T extends FieldValues> {
  resolver: ZodType<any, any, any>;
  getDefaultValues: () => DefaultValues<T> | undefined;
  onValidate: (data: T) => void;
  onInvalid: (errors: FieldErrors<T>) => void;
  onSubmit: (data: T) => Promise<T | void>;
  onCreate?: (data: T) => Promise<T | void>;
  onUpdate?: (data: T) => Promise<T | void>;
  onDelete: (id: number) => Promise<void>;
  onRender: (options: OnRenderProps<T>) => React.ReactNode;
}

export type OnRenderProps<T extends FieldValues> = {
  form: UseFormReturn<T, any, undefined>;
  params: IRenderFormProps<T>;
};

export function RenderForm<T extends FieldValues>(
  props: Readonly<IRenderFormProps<T>>
) {
  const {
    resolver,
    getDefaultValues,
    onValidate,
    onInvalid,
    onSubmit,
    onRender,
  } = props;

  const form = useForm<T>({
    resolver: zodResolver(resolver),
    defaultValues: getDefaultValues(),
  });

  const { handleSubmit } = form;

  async function handleWhichAction(data: T) {
    onValidate(data);

    const response = await onSubmit(data);
    return response;
  }

  async function handleInvalid(errors: FieldErrors<T>) {
    onInvalid(errors);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleWhichAction, handleInvalid)}>
        {onRender({ form, params: props })}
      </form>
    </Form>
  );
}
