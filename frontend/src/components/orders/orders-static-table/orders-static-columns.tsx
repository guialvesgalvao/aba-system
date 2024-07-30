import { StaticColumn } from "@/components/static-table/static-table";
import { StatusBadge } from "@/components/status-badge/status-badge";

import { Product } from "@/shared/factories/products-factory";
import {
  getBadgeColorBasedOnStatus,
  getOrderDescriptionByStatus,
  getOrderTextByStatus,
} from "@/shared/helpers/orders-helper/orders-helper";
import { OrderStatus } from "@/shared/types/orders-types";

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
      const status: OrderStatus = row.status;

      return (
        <StatusBadge
          text={getOrderTextByStatus(status)}
          className={getBadgeColorBasedOnStatus(status)}
          description={getOrderDescriptionByStatus(status)}
        />
      );
    },
  },
];
