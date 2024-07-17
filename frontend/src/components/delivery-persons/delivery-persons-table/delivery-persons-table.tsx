import { LoadingSpinner } from "../../loading-spinner/loading-spinner";
import { DeliveryPerson } from "@/shared/factories/delivery-persons-factory";
import { columns } from "./delivery-persons-columns";
import { RenderTable } from "@/components/render-table/render-table";
import { ComponentResponse } from "@/components/component-request/component-request";
import { ErrorMessage } from "@/components/error-message/error-message";
import { AlertCircle } from "lucide-react";

export interface IDeliveryPersonsTableProps extends ComponentResponse<DeliveryPerson> {}

export function DeliveryPersonsTable(props: IDeliveryPersonsTableProps) {
  const {
    data: deliveryPersons,
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
        <LoadingSpinner text="Buscando todos tipos de entrega" className="w-12 h-12" />
      </div>
    );

  return (
    <RenderTable<DeliveryPerson>
      id="delivery-persons-table"
      refetch={refetch}
      data={deliveryPersons}
      columns={columns}
      emptyMessage="Nenhum tipo de entrega encontrado"
      searchOptions={{
        placeholder: "Filtrar tipos de entrega pelo nome...",
        columnId: "name",
      }}
      columnChooser={{
        text: "Adicionar Colunas",
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
