import { StaticColumn } from "@/components/static-table/static-table";
import { StatusBadge } from "@/components/status-badge/status-badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Order } from "@/shared/factories/orders-factory";

import {
  getFormattedDynamicText,
  getFullFormattedDate,
} from "@/shared/helpers/date-helper/date-helper";
import {
  getBadgeColorBasedOnStatus,
  getOrderDescriptionByStatus,
  getOrderTextByStatus,
} from "@/shared/helpers/orders-helper/orders-helper";
import { OrderStatus } from "@/shared/types/orders-types";

export const columns: StaticColumn<Order>[] = [
  {
    id: "id",
    header: "ID",
    cell(row) {
      return row.id;
    },
  },
  {
    id: "client_id",
    header: "Cliente",
    cell(row) {
      return row.client_id;
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
  {
    id: "modifiedDate",
    header: "Última modificação",
    cell(row) {
      const date: Date = row.createdDate;

      const text = getFormattedDynamicText(date, {
        updatedNow: "Agora mesmo",
        updatedAgo: "Modificado há {minutes}",
        updatedAt: "às",
      });

      return (
        <Tooltip delayDuration={1000}>
          <TooltipTrigger>{text}</TooltipTrigger>
          <TooltipContent className="max-w-80">
            {getFullFormattedDate(date)}
          </TooltipContent>
        </Tooltip>
      );
    },
  },
];
