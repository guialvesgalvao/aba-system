import { LoadingSpinner } from "../../loading-spinner/loading-spinner";

import { Origin } from "@/shared/factories/origins-factory";
import { columns } from "./origins-columns";
import RenderTable from "@/components/render-table/render-table";
import { ComponentResponse } from "@/components/component-request/component-request";
import { ErrorMessage } from "@/components/error-message/error-message";
import { AlertCircle } from "lucide-react";
import { STATUS_OPTIONS } from "@/shared/constants";

export interface IOriginsTableProps extends ComponentResponse<Origin> {}

export function OriginsTable(props: IOriginsTableProps) {
  const {
    data: products,
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
          text="Buscando todas as origens"
          className="w-12 h-12"
        />
      </div>
    );

  return (
    <RenderTable<Origin>
      id="products-table"
      refetch={refetch}
      data={products}
      columns={columns}
      emptyMessage="Nenhum produto encontrado"
      searchOptions={{
        placeholder: "Filtrar origem pelo nome...",
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
    />
  );
}
