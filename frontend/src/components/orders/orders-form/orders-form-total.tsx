import { Badge } from "@/components/ui/badge";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getCoinFormat } from "@/shared/helpers/format-helper";
import { useState } from "react";
import { Control } from "react-hook-form";
import { OrdersFormValidationType } from "./interface";

interface IOrdersFormTotalProps {
  totalValue: number;
  control: Control<OrdersFormValidationType>;
}

export function OrdersFormTotal(props: Readonly<IOrdersFormTotalProps>) {
  const { totalValue, control } = props;

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <p className="font-medium">Valor total do Pedido:</p>

      <FormField
        control={control}
        name="products"
        render={() => {
          if (isEditing) {
            return (
              <Input
                className="w-28 h-6"
                type="number"
                onBlur={() => setIsEditing(false)}
                placeholder="R$ 0,00"
                autoFocus
              />
            );
          }

          return (
            <Badge onClick={() => setIsEditing(true)} variant="secondary">
              {getCoinFormat(totalValue)}
            </Badge>
          );
        }}
      />
    </div>
  );
}
