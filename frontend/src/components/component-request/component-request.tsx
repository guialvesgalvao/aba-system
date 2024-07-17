import React from "react";

import { useQuery } from "@tanstack/react-query";

export type ComponentResponse<I> = {
  data: I[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
};

interface IComponentRequestProps<M> {
  storages: string[];
  request: () => Promise<M[]>;
  component: (props: ComponentResponse<M>) => JSX.Element;
}

export function ComponentRequest<M>(props: IComponentRequestProps<M>) {
  const { storages, request, component } = props;

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: storages,
    queryFn: request,
    retry: false,
    refetchOnWindowFocus: false,
  });

  async function handleRefresh() {
    try {
      refetch();
    } catch (error) {
      console.error(error);
    }
  }

  return React.createElement(component, {
    data: data ?? [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch: handleRefresh,
  });
}
