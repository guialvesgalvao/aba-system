import React from "react";

import { useQuery } from "@tanstack/react-query";

type ComponentResponse<I> = {
  data: I[];
  isLoading: boolean;
  isFetching: boolean;
};

interface IComponentRequestProps<M> {
  storages: string[];
  request: () => Promise<M[]>;
  component: (props: ComponentResponse<M>) => JSX.Element;
}

export function ComponentRequest<M>(props: IComponentRequestProps<M>) {
  const { storages, request, component } = props;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: storages,
    queryFn: request,
    refetchOnWindowFocus: false,
  });

  return React.createElement(component, {
    data: data ?? [],
    isLoading,
    isFetching,
  });
}
