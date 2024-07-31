import { ErrorMessage } from "@/components/error-message/error-message";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";
import { Supplier } from "@/shared/factories/suppliers-factory";

import SuppliersService from "@/shared/services/suppliers-service";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";

interface ISuppliersProductsProps {
  supplier: Supplier;
}

export function SuppliersProducts(props: Readonly<ISuppliersProductsProps>) {
  const { supplier } = props;

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["suppliers-products", supplier.id.toString()],
    queryFn: getSupplierProducts,
    refetchOnWindowFocus: false,
  });

  async function getSupplierProducts() {
    const service = new SuppliersService();
    const supplierWithProducts = await service.getSupplierExtendedData(
      supplier
    );

    return supplierWithProducts.supplier_products;
  }

  if (isError) {
    return (
      <ErrorMessage
        className="text-lg"
        icon={<AlertCircle className="w-14 h-14" />}
        error={error}
      />
    );
  }

  if (isLoading || isFetching) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner text="Carregando produtos..." className="w-8 h-8" />
      </div>
    );
  }

  return (
    <div>
      <pre style={{ fontSize: "10px" }}>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
}
