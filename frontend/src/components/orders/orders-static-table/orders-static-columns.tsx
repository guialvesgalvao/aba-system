import { StaticColumn } from "@/components/static-table/static-table";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/shared/factories/products-factory";

export const columns: StaticColumn<Product>[] = [
  {
    id: "id",
    header: "ID",
    cell(row) {
      return row.id;
    },
  },
  {
    id: "name",
    header: "Nome",
    cell(row) {
      return row.name;
    },
  },
  {
    id: "status",
    header: "Status",
    cell(row) {
      return <Badge variant="outline">{row.status}</Badge>;
    },
  },
];
