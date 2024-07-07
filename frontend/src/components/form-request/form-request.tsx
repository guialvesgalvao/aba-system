import { useQuery } from "@tanstack/react-query";
import React from "react";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";
import { useSearchParams } from "react-router-dom";

type FormResponse<I> = {
  item: I | undefined;
  isLoading: boolean;
  isFetching: boolean;
};

interface IFormRequestProps<M> {
  form: string;
  request: (id: number) => Promise<M>;
  component: (props: FormResponse<M>) => JSX.Element;
  loading?: string;
}

export function FormRequest<M>(props: IFormRequestProps<M>) {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("formId");

  if (!id) return null;

  const { form, request, component, loading } = props;

  const { data, isLoading, isFetching } = useQuery({
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

  if (isLoading || isFetching)
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <LoadingSpinner text={loading} className="w-12 h-12" />
      </div>
    );

  return React.createElement(component, {
    item: data ?? undefined,
    isLoading,
    isFetching,
  });
}
