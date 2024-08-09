import { LoadingSpinner } from "../../loading-spinner/loading-spinner";

import { Customer } from "@/shared/factories/customers-factory";
import { columns } from "./customers-columns";
import RenderTable from "@/components/render-table/render-table";
import { ComponentResponse } from "@/components/component-request/component-request";
import { ErrorMessage } from "@/components/error-message/error-message";
import { AlertCircle } from "lucide-react";
import { STATUS_OPTIONS } from "@/shared/constants";

export interface ICustomersTableProps extends ComponentResponse<Customer> {}

export function CustomersTable(props: ICustomersTableProps) {
  const {
    data: customers,
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
          text="Buscando todos os clientes"
          className="w-12 h-12"
        />
      </div>
    );

  return (
    <RenderTable<Customer>
      id="customers-table"
      refetch={refetch}
      data={customers}
      columns={columns}
      emptyMessage="Nenhum cliente encontrado"
      searchOptions={{
        placeholder: "Filtrar clientes pelo nome fantasia...",
        columnId: "fantasy_name",
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
