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
  enabled?: boolean;
  strings?: {
    loadingText?: string;
  };
}

export function ComponentRequest<M>(
  props: Readonly<IComponentRequestProps<M>>
) {
  const { storages, request, component, enabled = true } = props;

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: storages,
    queryFn: request,
    retry: false,
    enabled,
    refetchOnWindowFocus: false,
  });

  async function handleRefresh() {
    try {
      await refetch();
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
