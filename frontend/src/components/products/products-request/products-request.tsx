import React from "react";

import { useQuery } from "@tanstack/react-query";
import { Product } from "@/shared/factories/products-factory";
import { ProductModel } from "@/shared/models/products-model";

type ProductsResponse = {
  products: Product[];
  isLoading: boolean;
  isFetching: boolean;
};

interface IProductsRequestProps {
  storages: string[];
  request: () => Promise<ProductModel[]>;
  component: (props: ProductsResponse) => JSX.Element;
}

export function ProductsRequest(props: IProductsRequestProps) {
  const { storages, request, component } = props;

  const {
    data: products,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: storages,
    queryFn: handleRequestMiddleware,
    refetchOnWindowFocus: false,
  });

  async function handleRequestMiddleware() {
    try {
      const response = await request();
      const products = response.map((product) => new Product(product));

      return products;
    } catch (error) {
      throw new Error("Error getting products");
    }
  }

  return React.createElement(component, {
    products: products ?? [],
    isLoading,
    isFetching,
  });
}
