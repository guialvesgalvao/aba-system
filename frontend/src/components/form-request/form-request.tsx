import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSearchParams } from "react-router-dom";

export type FormResponse<I> = {
  item: I | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
};

interface IFormRequestProps<M> {
  form: string;
  request: (id: number) => Promise<M>;
  component: (props: FormResponse<M>) => JSX.Element;
}

export function FormRequest<M>(props: IFormRequestProps<M>) {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("formId");

  if (!id) return null;

  const { form, request, component } = props;

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: [form, "form"],
    queryFn: middleware,
    refetchOnWindowFocus: false,
  });

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

  return React.createElement(component, {
    item: data ?? undefined,
    isLoading,
    isFetching,
    isError,
    error,
  });
}
