import { LoadingSpinner } from "../../loading-spinner/loading-spinner";

import { Supplier } from "@/shared/factories/suppliers-factory";
import { columns } from "./suppliers-columns";
import RenderTable from "@/components/render-table/render-table";
import { ComponentResponse } from "@/components/component-request/component-request";
import { ErrorMessage } from "@/components/error-message/error-message";
import { AlertCircle } from "lucide-react";
import { SuppliersProducts } from "./suppliers-products";

import { STATUS_OPTIONS } from "@/shared/constants";

export interface ISuppliersTableProps extends ComponentResponse<Supplier> {}

export function SuppliersTable(props: Readonly<ISuppliersTableProps>) {
  const {
    data: suppliers,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = props;

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
        <LoadingSpinner
          text="Buscando todos fornecedores"
          className="w-12 h-12"
        />
      </div>
    );

  return (
    <RenderTable<Supplier>
      id="suppliers-table"
      refetch={refetch}
      data={suppliers}
      columns={columns}
      emptyMessage="Nenhum fornecedor encontrado"
      searchOptions={{
        placeholder: "Filtrar fornecedores pelo nome...",
        columnId: "name",
      }}
      columnFilter={{
        columns: [
          {
            id: "status",
            title: "Status",
            options: STATUS_OPTIONS,
          },
        ],
      }}
      defaultSorting={[
        {
          id: "modifiedDate",
          desc: true,
        },
      ]}
      defaultPagination={{
        pageSize: 10,
        pageIndex: 0,
      }}
      defaultSizes={[5, 10, 20]}
      getRowCanExpand={() => true}
      renderSubComponent={({ row }) => (
        <div className="bg-white hover:bg-white">
          <SuppliersProducts supplier={row.original} />
        </div>
      )}
    />
  );
}
