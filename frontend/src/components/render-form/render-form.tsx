import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, FieldErrors, useForm } from "react-hook-form";

import { Form } from "../ui/form";
import { IRenderFormProps } from "./interface";

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
      <form
        className="h-full"
        onSubmit={handleSubmit(handleWhichAction, handleInvalid)}
      >
        {onRender({ form, params: props })}
      </form>
    </Form>
  );
}
