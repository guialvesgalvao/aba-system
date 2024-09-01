import { Combobox, OptionValue } from "@/components/combobox/combobox";
import { RequestCombobox } from "@/components/combobox/request-combobox";
import { DatePicker } from "@/components/inputs/date-picker/date-picker";
import { RenderForm } from "@/components/render-form/render-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { SystemRoutes } from "@/shared/enums/app";

import CustomersService from "@/shared/services/customers-service";
import OriginsService from "@/shared/services/origins-service";
import { Eraser, MoveLeft, Plus } from "lucide-react";
import { FieldErrors } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const OrdersFormValidation = z.object({
  id: z.number().optional(),
  client_id: z.number({
    required_error: "Selecione o cliente",
  }),
  origin_id: z.number({
    required_error: "Selecione a origem do pedido",
  }),
  order_date: z.string({
    required_error: "Adicione a data do pedido",
  }),
  order_payment_date: z.string({
    required_error: "Adicione a data de faturamento",
  }),
  description: z.string().optional(),
});

export type OrdersFormValidationType = z.infer<typeof OrdersFormValidation>;

export function OrdersForm() {
  const { getCustomersByStatus } = new CustomersService();
  const { getOriginsByStatus } = new OriginsService();

  function getDefaultValues() {
    return {
      id: 0,
      client_id: 0,
      origin_id: 0,
      order_date: new Date().toISOString(),
      order_payment_date: undefined,
      description: "",
    };
  }

  async function getCustomersAsOptions(): Promise<OptionValue[]> {
    const customers = await getCustomersByStatus("enabled");

    return customers.map(
      (customer) =>
        ({
          value: customer.id.toString(),
          label: customer.fantasy_name,
        } as OptionValue)
    );
  }

  async function getOriginsAsOptions(): Promise<OptionValue[]> {
    const origins = await getOriginsByStatus("enabled");
    return origins.map(
      (origin) =>
        ({
          value: origin.id.toString(),
          label: origin.name,
        } as OptionValue)
    );
  }

  function validateFormData(data: OrdersFormValidationType) {
    OrdersFormValidation.parse(data);
  }

  return (
    <RenderForm<OrdersFormValidationType>
      resolver={OrdersFormValidation}
      getDefaultValues={getDefaultValues}
      onValidate={validateFormData}
      onInvalid={(errors) => console.log(errors)}
      onSubmit={async (data) => console.log(data)}
      onRender={({ form }) => {
        const { control, reset, formState } = form;

        const { isDirty } = formState;

        return (
          <div className="h-full flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Campo Cliente */}
              <FormField
                control={control}
                name="client_id"
                render={({ field: { onChange } }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="client_id" required>
                      Cliente
                    </FormLabel>
                    <FormControl>
                      <RequestCombobox
                        storages={["clients"]}
                        request={getCustomersAsOptions}
                        onChange={(option) => {
                          if (!option) onChange(undefined);

                          const asInt = parseInt(option?.value);
                          onChange(asInt);
                        }}
                        strings={{
                          placeholder: "Procurar pelo cliente...",
                          search: "Procurar...",
                          empty: "Nenhum cliente encontrado.",
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Selecione o cliente para o pedido de compra.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Origem */}
              <FormField
                control={control}
                name="origin_id"
                render={({ field: { onChange } }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="origin_id" required>
                      Origem
                    </FormLabel>
                    <FormControl>
                      <RequestCombobox
                        storages={["origins"]}
                        request={getOriginsAsOptions}
                        onChange={(option) => {
                          if (!option) onChange(undefined);

                          const asInt = parseInt(option?.value);
                          onChange(asInt);
                        }}
                        strings={{
                          placeholder: "Procurar pela origem do pedido...",
                          search: "Procurar...",
                          empty: "Nenhuma origem encontrado.",
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Selecione a origem do pedido de compra.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Campo Data do Pedido */}
              <FormField
                control={control}
                name="order_date"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="order_date" required>
                      Data do Pedido
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        value={value ? new Date(value) : undefined}
                        onChange={(date) => {
                          onChange(date?.toISOString());
                        }}
                        strings={{
                          button: "Escolha a data do pedido",
                          placeholder: "Escolha uma data",
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Adicione a data do pedido de compra.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Data de Faturamento */}
              <FormField
                control={control}
                name="order_payment_date"
                render={({ field: { onChange } }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="order_payment_date" required>
                      Data de Faturamento
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        onChange={(date) => {
                          onChange(date?.toISOString());
                        }}
                        strings={{
                          button: "Escolha a data de faturamento",
                          placeholder: "Escolha uma data",
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Adicione a data de faturamento do pedido de compra.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Campo Descrição */}
              <FormField
                control={control}
                name="description"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="description">Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        value={value}
                        onChange={onChange}
                        placeholder="Adicione uma descrição ao pedido..."
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center py-4 gap-4">
              <Separator className="shrink-1" />
              <h3 className="text-lg font-semibold text-primary">Produtos</h3>
              <Separator className="shrink-1" />
            </div>

            <div className="w-full mt-auto flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-8">
              <div className="w-full md:w-auto flex items-center">
                <Link className="w-full md:w-auto" to={SystemRoutes.ORDERS}>
                  <Button
                    className="w-full md:w-auto gap-2"
                    type="button"
                    variant="outline"
                  >
                    <MoveLeft className="w-5 h-5" />
                    Voltar para pedidos
                  </Button>
                </Link>
              </div>

              <div className="w-full md:w-auto flex flex-col-reverse md:flex-row justify-center items-center md:justify-end gap-4">
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

                <Button
                  className="w-full md:w-auto gap-2"
                  type="submit"
                  variant="default"
                >
                  <Plus className="w-5 h-5" />
                  Criar pedido
                </Button>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}
