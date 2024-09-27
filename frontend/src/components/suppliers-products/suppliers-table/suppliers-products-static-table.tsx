import { ComponentResponse } from "@/components/component-request/component-request";
import { StaticTable } from "@/components/static-table/static-table";
import { columns } from "./suppliers-products-static-columns";

import { ErrorMessage } from "@/components/error-message/error-message";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";
import { AlertCircle } from "lucide-react";
import { SupplierProductExtendedResponse } from "@/shared/types/suppliers-products-types";

export interface ISupplierProductsStaticTableProps extends ComponentResponse<SupplierProductExtendedResponse> {}

export function SupplierProductsStaticTable(props: Readonly<ISupplierProductsStaticTableProps>) {
  const { data: orders, isLoading, isError, error, isFetching } = props;

  if (isError) {
    return (
      <ErrorMessage
        className="text-lg"
        icon={<AlertCircle className="w-14 h-14" />}
        error={error}
      />
    );
  }

  if (isLoading || isFetching)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner text="Buscando todos os produtos do fornecedor" className="w-12 h-12" />
      </div>
    );

  return (
    <StaticTable<SupplierProductExtendedResponse>
      caption="Todos os produtos do fornecedor"
      headers={columns}
      data={orders}
      hasBorder={true}
    />
  );
}
