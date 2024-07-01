import { useQuery } from "@tanstack/react-query";
import React from "react";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";

type FormResponse<I> = {
  item: I | undefined;
  isLoading: boolean;
  isFetching: boolean;
};

interface IFormRequestProps<M> {
  id: number;
  form: string;
  request: (id: number) => Promise<M>;
  component: (props: FormResponse<M>) => JSX.Element;
  loading?: string;
}

export function FormRequest<M>(props: IFormRequestProps<M>) {
  const { id, form, request, component, loading } = props;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [form, "form"],
    queryFn: middleware,
    refetchOnWindowFocus: false,
  });

  async function middleware(): Promise<M> {
    try {
      const item = await request(id);
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
