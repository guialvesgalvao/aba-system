import { getActiveProducts } from "@/shared/services/products-service";
import { useQuery } from "@tanstack/react-query";
import { ProductsTable } from "../products-table";
import { Suspense } from "react";
import { LoadingSpinner } from "../../loading-spinner/loading-spinner";

export function ProductsActive() {
  const {
    data: products,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["products", "active"],
    queryFn: getActiveProducts,
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner text="Buscando produtos ativos" className="w-12 h-12" />
      </div>
    );

  return (
    <Suspense fallback={"Buscando produtos..."}>
      <ProductsTable products={products ?? []} />
    </Suspense>
  );
}
