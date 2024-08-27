import { StaticColumn } from "@/components/static-table/static-table";
import { StatusBadge } from "@/components/status-badge/status-badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  getFormattedDynamicText,
  getFullFormattedDate,
} from "@/shared/helpers/date-helper/date-helper";
import {
  getBadgeColorBasedOnStatus,
  getOrderDescriptionByStatus,
  getOrderTextByStatus,
} from "@/shared/helpers/orders-helper/orders-helper";
import { OrderItensResponse, OrderItensStatus } from "@/shared/types/orders-itens-types";

export const columns: StaticColumn<OrderItensResponse>[] = [
  {
    id: "id",
    header: "ID",
    cell(row) {
      return row.id;
    },
  },
  {
    id: "product_id",
    header: "Id do Produto",
    cell(row) {
      return row.product_id;
    },
  },
  {
    id: "status",
    header: "Status",
    cell(row) {
      const status: OrderItensStatus = row.status;

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
    id: "modified_at",
    header: "Última modificação",
    cell(row) {
      const date: Date = new Date(row.created_at);

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
