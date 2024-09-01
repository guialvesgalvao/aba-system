import { Button } from "@/components/ui/button";
import { Eraser, Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { OrdersFormValidationType } from "./orders-form";

interface IOrdersFormButtonsProps {
  form: UseFormReturn<OrdersFormValidationType, any, undefined>;
}

export function OrdersFormButtons(props: Readonly<IOrdersFormButtonsProps>) {
  const { form } = props;
  const { reset, formState } = form;
  const { isDirty, isSubmitting, isValidating, isLoading } = formState;

  return (
    <div className="w-full mt-auto flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-8">
      <div className="w-full md:w-auto flex items-center">
        <Button
          type="button"
          className="w-full md:w-auto gap-2"
          variant="destructive"
          onClick={() => reset(undefined)}
          disabled={!isDirty}
        >
          <Eraser className="w-5 h-5" />
          Limpar campos
        </Button>
      </div>

      <div className="w-full md:w-auto flex flex-col-reverse md:flex-row justify-center items-center md:justify-end gap-4">
        <Button
          className="w-full md:w-auto gap-2"
          type="submit"
          variant="default"
          disabled={isLoading || isSubmitting || isValidating}
        >
          <Plus className="w-5 h-5" />
          Criar pedido
        </Button>
      </div>
    </div>
  );
}
