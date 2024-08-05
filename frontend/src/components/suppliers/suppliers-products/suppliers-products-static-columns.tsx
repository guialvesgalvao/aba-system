import { StaticColumn } from "@/components/static-table/static-table";
import { SupplierProductExtendedResponse } from "@/shared/types/suppliers-products-types";
import { addDays, format, parseISO } from "date-fns";

export const columns: StaticColumn<SupplierProductExtendedResponse>[] = [
  {
    id: "id",
    header: "ID",
    cell(row) {
      return row.id;
    },
  },
  {
    id: "product_info",
    header: "Nome do produto",
    cell(row) {
      return `${row.product_info.name}`;
    },
  },
  {
    id: "value",
    header: "Valor",
    cell(row) {
      return <p>R$ {row.value}</p>;
    },
  },
  {
    id: "validity_period",
    header: "Valor válido até",
    cell(row) {
      const date = parseISO(row.created_at);
      const newDate = addDays(date, row.validity_period);

      return format(newDate, "dd/MM/yyyy");
    },
  },
];
