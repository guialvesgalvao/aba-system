import {
  DefaultValues,
  FieldErrors,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";

export interface IRenderFormProps<T extends FieldValues> {
  resolver: ZodType<any, any, any>;
  getDefaultValues: () => DefaultValues<T> | undefined;
  onValidate: (data: T) => void;
  onInvalid: (errors: FieldErrors<T>) => void;
  onSubmit: (data: T) => Promise<T | void>;
  onCreate?: (data: T) => Promise<T | void>;
  onUpdate?: (data: T) => Promise<T | void>;
  onDelete?: (id: number) => Promise<void>;
  onRender: (options: OnRenderProps<T>) => React.ReactNode;
}

export type OnRenderProps<T extends FieldValues> = {
  form: UseFormReturn<T, any, undefined>;
  params: IRenderFormProps<T>;
};
