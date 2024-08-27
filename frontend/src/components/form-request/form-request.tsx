import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { ErrorMessage } from "../error-message/error-message";
import { AlertCircle } from "lucide-react";

export type FormResponse<I> = {
  trigger?: React.ReactNode;
  formKeys: string[];
  item: I | undefined;
  isLoading: boolean;
  isFetching: boolean;
};

export interface IFormRequestProps<M> {
  trigger?: React.ReactNode;
  form: string[];
  request: (id: number) => Promise<M>;
  component: (props: FormResponse<M>) => JSX.Element;
}

export function FormRequest<M>(props: Readonly<IFormRequestProps<M>>) {
  const { trigger, form, request, component } = props;
  const [searchParams] = useSearchParams();

  const id = searchParams.get("formId");

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: [...form, "form"],
    queryFn: middleware,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  if (!id) return null;

  async function middleware(): Promise<M> {
    try {
      if (!id) throw new Error("ID not found");

      const idAsNumber = parseInt(id);

      const item = await request(idAsNumber);
      return item;
    } catch (error) {
      throw new Error("Error fetching data from the server " + error);
    }
  }

  if (isError) {
    return (
      <div className="px-10 py-10">
        <ErrorMessage
          icon={<AlertCircle className="w-14 h-14" />}
          className="text-lg"
          error={error}
        />
      </div>
    );
  }

  return React.createElement(component, {
    trigger,
    formKeys: form,
    item: data ?? undefined,
    isLoading,
    isFetching,
  });
}
