import { ColumnFilterOptionsSchema } from "@/components/render-table/column-filter-controller/column-filter-controller";
import { CircleCheckBig, BookDashed, Archive } from "lucide-react";

export const STATUS_OPTIONS: ColumnFilterOptionsSchema[] = [
  {
    value: "enabled",
    label: "Ativo",
    icon: CircleCheckBig,
  },
  {
    value: "draft",
    label: "Rascunho",
    icon: BookDashed,
  },
  {
    value: "archive",
    label: "Arquivado",
    icon: Archive,
  },
];
