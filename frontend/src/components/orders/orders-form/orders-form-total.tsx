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
        render={() => (
          <Input
            type="number"
            value={isEditing ? totalValue : getCoinFormat(totalValue)}
            onBlur={() => setIsEditing(false)}
            onClick={() => setIsEditing(true)}
            placeholder="R$ 0,00"
          />
        )}
      />
    </div>
  );
}
