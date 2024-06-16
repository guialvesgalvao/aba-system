import { Suspense } from "react";

import { useQuery } from "@tanstack/react-query";

import { ProductsTable } from "../products-table";
import { LoadingSpinner } from "../../loading-spinner/loading-spinner";
import { getAllProducts } from "@/shared/services/products-service";

export function ProductsAll() {
  const {
    data: products,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["products", "all"],
    queryFn: getAllProducts,
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner text="Buscando todos produtos" className="w-12 h-12" />
      </div>
    );

  return (
    <Suspense fallback={"Buscando produtos..."}>
      <ProductsTable products={products ?? []} />
    </Suspense>
  );
}
