import { Combobox } from "@/components/combobox/combobox";
import { RequestCombobox } from "@/components/combobox/request-combobox";
import { RenderForm } from "@/components/render-form/render-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Order } from "@/shared/factories/orders-factory";
import { FieldErrors } from "react-hook-form";
import { z } from "zod";

const OrdersFormValidation = z.object({
  id: z.number().positive().optional(),
  client_id: z.number().positive(),
  origin_id: z.number().positive(),
});

export type OrdersFormValidationType = z.infer<typeof OrdersFormValidation>;

export function OrdersForm() {
  function getDefaultValues(): OrdersFormValidationType {
    return {
      id: 0,
      client_id: 0,
      origin_id: 0,
    };
  }

  return (
    <RenderForm<Order>
      resolver={OrdersFormValidation}
      getDefaultValues={getDefaultValues}
      onValidate={function (data: Order): void {
        throw new Error("Function not implemented.");
      }}
      onInvalid={function (errors: FieldErrors<Order>): void {
        throw new Error("Function not implemented.");
      }}
      onSubmit={function (data: Order): Promise<void | Order> {
        throw new Error("Function not implemented.");
      }}
      onRender={({ form }) => {
        const { control } = form;

        return (
          <div className="flex flex-col gap-6">
            <FormField
              control={control}
              name="client_id"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel htmlFor="client_id" required>
                    Cliente
                  </FormLabel>
                  <FormControl>
                    <RequestCombobox
                      storages={["clients"]}
                      request={() =>
                        Promise.resolve([
                          {
                            value: "Teste",
                            label: "Teste",
                            heading: "Grupo 2",
                          },
                          {
                            value: "Teste 2",
                            label: "Teste 2",
                            heading: "Grupo 1",
                          },
                          {
                            value: "Teste 3",
                            label: "Teste 3",
                            heading: "Grupo 1",
                          },
                        ])
                      }
                      onChange={onChange}
                      strings={{
                        placeholder: "Procurar pelo cliente...",
                        search: "Procurar...",
                        empty: "Nenhum cliente encontrado.",
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      }}
    />
  );
}
