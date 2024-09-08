import { Control } from "react-hook-form";
import { OrdersFormValidationType } from "./interface";

import { Input } from "@/components/ui/input";
import { RequestCombobox } from "@/components/combobox/request-combobox";

import CustomersService from "@/shared/services/customers-service";
import OriginsService from "@/shared/services/origins-service";
import { DatePicker } from "@/components/inputs/date-picker/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { getPromiseAsOptions } from "@/shared/helpers/form-helper/form-helper";
import { MapPin, User } from "lucide-react";
import { RenderField } from "@/components/render-form/render-field";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";

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
        <RenderField
          control={control}
          name="title"
          label="Título"
          description="Adicione um título ao pedido de compra. Ex: Pedido de compra de produtos."
          render={({ field: { name, value, onChange } }) => (
            <Input
              name={name}
              type="text"
              value={value ?? ""}
              onChange={onChange}
              placeholder="Título do pedido..."
              autoFocus
            />
          )}
          required
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 flex-wrap">
        {/* Campo Cliente */}
        <RenderField
          className="flex-1"
          control={control}
          name="client_id"
          label="Cliente"
          description="Selecione o cliente para o pedido de compra."
          render={({ field: { onChange, value }, fieldState: { error } }) => (
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
          )}
          required
        />

        <RenderField
          className="flex-1"
          control={control}
          name="origin_id"
          label="Origem"
          description="Selecione a origem do pedido de compra."
          render={({ field: { onChange, value }, fieldState: { error } }) => (
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
          )}
          required
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <RenderField
          control={control}
          name="order_date"
          label="Data do Pedido"
          description="Adicione a data do pedido de compra."
          render={({
            field: { name, value, onChange },
            fieldState: { error },
          }) => (
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
          )}
          required
        />

        <RenderField
          control={control}
          name="order_payment_date"
          label="Data de Faturamento"
          description="Adicione a data de faturamento do pedido de compra."
          render={({
            field: { name, onChange, value },
            fieldState: { error },
          }) => (
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
          )}
          required
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <RenderField
          control={control}
          name="description"
          label="Descrição"
          description="Adicione uma descrição ao pedido de compra."
          render={({ field: { name, value, onChange } }) => (
            <AutosizeTextarea
              name={name}
              value={value ?? ""}
              onChange={onChange}
              placeholder="Adicione uma descrição ao pedido..."
              rows={4}
            />
          )}
        />
      </div>
    </div>
  );
}
