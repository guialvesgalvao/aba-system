import { LoadingSpinner } from "../../loading-spinner/loading-spinner";

import { Supplier } from "@/shared/factories/suppliers-factory";
import { columns } from "./suppliers-columns";
import RenderTable from "@/components/render-table/render-table";
import { ComponentResponse } from "@/components/component-request/component-request";
import { ErrorMessage } from "@/components/error-message/error-message";
import { AlertCircle } from "lucide-react";
import SuppliersService from "@/shared/services/suppliers-service";
import { useEffect, useState } from "react";
import { SupplierProductExtendedResponse } from "@/shared/types/suppliers-products-types";

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

  const [supplierData, setSupplierData] = useState<Supplier[]>(suppliers);
  const [expandedRowData, setExpandedRowData] = useState<{
    [key: number]: SupplierProductExtendedResponse[] | null;
  }>({});

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

    const fetchSupplierExtendedData = async (supplier: Supplier) => {
      const { getSupplierExtendendData } = new SuppliersService();
      const data = await getSupplierExtendendData(supplier);
      console.log(data)
      setExpandedRowData((prev) => ({
        ...prev,
        [supplier.id]: data as unknown as SupplierProductExtendedResponse[] | null,
      }));
    };

  return (
    <RenderTable<Supplier>
      id="suppliers-table"
      refetch={refetch}
      data={supplierData}
      columns={columns}
      emptyMessage="Nenhum fornecedor encontrado"
      searchOptions={{
        placeholder: "Filtrar fornecedores pelo nome...",
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
      getRowCanExpand={() => true}
      renderSubComponent={ ({ row }) => {
        
        const supplier = row.original;
        const supplierProducts = expandedRowData[supplier.id];

        useEffect(() => {
          if (!supplierProducts) {
            fetchSupplierExtendedData(supplier);
          }
        }, [supplierProducts, supplier]);

        if (!supplierProducts) {
          return (
            <div className="w-full h-full flex items-center justify-center">
              <LoadingSpinner text="Carregando produtos do fornecedor..." className="w-12 h-12" />
            </div>
          );
        }
        return (
          <pre style={{ fontSize: "10px" }}>
            <code>
              {JSON.stringify(row.original.supplier_products, null, 2)}
            </code>
          </pre>
        );
      }}
    />
  );
}
