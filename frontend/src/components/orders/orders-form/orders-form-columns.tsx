import { Control } from "react-hook-form";
import { OrdersFormValidationType } from "./orders-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RequestCombobox } from "@/components/combobox/request-combobox";

import CustomersService from "@/shared/services/customers-service";
import OriginsService from "@/shared/services/origins-service";
import { DatePicker } from "@/components/inputs/date-picker/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { getPromiseAsOptions } from "@/shared/helpers/form-helper/form-helper";
import { MapPin, User } from "lucide-react";

interface IOrdersFormColumnsProps {
  control: Control<OrdersFormValidationType>;
}

export function OrdersFormColumns(props: Readonly<IOrdersFormColumnsProps>) {
  const { control } = props;

  const { getCustomersByStatus } = new CustomersService();
  const { getOriginsByStatus } = new OriginsService();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Campo Título */}
        <FormField
          control={control}
          name="title"
          render={({ field: { name, value, onChange } }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="title" required>
                Título
              </FormLabel>
              <FormControl>
                <Input
                  name={name}
                  type="text"
                  value={value ?? ""}
                  onChange={onChange}
                  placeholder="Título do pedido..."
                />
              </FormControl>
              <FormDescription>
                Adicione um título ao pedido de compra. Ex: Pedido de compra de
                produtos.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 flex-wrap">
        {/* Campo Cliente */}
        <FormField
          control={control}
          name="client_id"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormItem className="flex-1">
              <FormLabel htmlFor="client_id" required>
                Cliente
              </FormLabel>
              <FormControl>
                <RequestCombobox
                  icon={User}
                  storages={["clients"]}
                  request={() =>
                    getPromiseAsOptions(
                      getCustomersByStatus("enabled"),
                      (customer) => ({
                        data: customer,
                        value: customer.id.toString(),
                        label: customer.fantasy_name,
                      })
                    )
                  }
                  onChange={(option) => {
                    if (!option) onChange(undefined);

                    const asInt = parseInt(option?.value);
                    onChange(asInt);
                  }}
                  selectedValue={value?.toString()}
                  strings={{
                    placeholder: "Selecione o cliente",
                    search: "Procurar cliente...",
                    empty: "Nenhum cliente encontrado.",
                  }}
                  isError={!!error}
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
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormItem className="flex-1">
              <FormLabel htmlFor="origin_id" required>
                Origem
              </FormLabel>
              <FormControl>
                <RequestCombobox
                  icon={MapPin}
                  storages={["origins"]}
                  request={() =>
                    getPromiseAsOptions(
                      getOriginsByStatus("enabled"),
                      (origin) => ({
                        data: origin,
                        value: origin.id.toString(),
                        label: origin.name,
                      })
                    )
                  }
                  onChange={(option) => {
                    if (!option) onChange(undefined);

                    const asInt = parseInt(option?.value);
                    onChange(asInt);
                  }}
                  selectedValue={value?.toString()}
                  strings={{
                    placeholder: "Selecione a origem do pedido",
                    search: "Procurar origem...",
                    empty: "Nenhuma origem encontrado.",
                  }}
                  isError={!!error}
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
          render={({
            field: { name, value, onChange },
            fieldState: { error },
          }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="order_date" required>
                Data do Pedido
              </FormLabel>
              <FormControl>
                <DatePicker
                  name={name}
                  selectedDate={value ? new Date(value) : undefined}
                  onChange={(date) => {
                    if (!date) return onChange(undefined);
                    onChange(date?.toISOString());
                  }}
                  strings={{
                    button: "Escolha a data do pedido",
                    placeholder: "Escolha uma data",
                  }}
                  isError={!!error}
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
          render={({
            field: { name, onChange, value },
            fieldState: { error },
          }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="order_payment_date" required>
                Data de Faturamento
              </FormLabel>
              <FormControl>
                <DatePicker
                  name={name}
                  selectedDate={value ? new Date(value) : undefined}
                  onChange={(date) => {
                    if (!date) return onChange(undefined);
                    onChange(date?.toISOString());
                  }}
                  strings={{
                    button: "Escolha a data de faturamento",
                    placeholder: "Escolha uma data",
                  }}
                  isError={!!error}
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
          render={({ field: { name, value, onChange } }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="description">Descrição</FormLabel>
              <FormControl>
                <Textarea
                  name={name}
                  value={value ?? ""}
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
    </div>
  );
}
