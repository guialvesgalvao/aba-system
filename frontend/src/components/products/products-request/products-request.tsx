import React from "react";

import { useQuery } from "@tanstack/react-query";
import { ProductModel } from "@/shared/models/products-model";

type Request = {
  products: ProductModel[];
  isLoading: boolean;
  isFetching: boolean;
};

interface IProductsRequestProps {
  storages: string[];
  request: () => Promise<ProductModel[]>;
  component: (props: Request) => JSX.Element;
}

export function ProductsRequest(props: IProductsRequestProps) {
  const { storages, request, component } = props;

  const {
    data: products,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: storages,
    queryFn: request,
    refetchOnWindowFocus: false,
  });

  return React.createElement(component, {
    products: products ?? [],
    isLoading,
    isFetching,
  });
}
