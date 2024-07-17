import z from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

import { Button } from "../../ui/button";

import { Input } from "../../ui/input";

import { Textarea } from "../../ui/textarea";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../ui/select";

import { DeliveryPerson } from "@/shared/factories/delivery-persons-factory";
import DeliveryPersonsService from "@/shared/services/delivery-persons-service";
import { DeliveryPersonRequest } from "@/shared/types/delivery-persons-types";

import { SubmitDialog } from "./delivery-persons-form-dialogs";
import { RenderForm } from "@/components/render-form/render-form";
import { FormResponse } from "@/components/form-request/form-request";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";
import { ErrorMessage } from "@/components/error-message/error-message";
import { AlertCircle, Frown } from "lucide-react";

const DeliveryPersonsFormCreateValidation = z.object({
  id: z
    .number()
    .positive("O ID do tipo da entrega deve ser um número positivo")
    .optional(),
  name: z
    .string({
      required_error: "Adicione um nome ao tipo da entrega",
    })
    .min(1, "Adicione um nome ao tipo da entrega")
    .max(255, "Adicione no máximo 255 caracteres"),
  status: z.enum(["enabled", "draft", "archived"], {
    required_error: "Selecione o status do tipo da entrega",
  }),
  created_by: z.string(),
});

export type DeliveryPersonsFormValidationType = z.infer<
  typeof DeliveryPersonsFormCreateValidation
>;

interface IDeliveryPersonsFormProps extends FormResponse<DeliveryPerson> {}

export function DeliveryPersonsForm(props: IDeliveryPersonsFormProps) {
  const { item: deliveryPerson, isError, isFetching, isLoading, error } = props;

  if (isError) {
    return (
      <div className="px-10 py-10">
        <ErrorMessage
          icon={<AlertCircle className="w-14 h-14" />}
          className="text-lg"
          error={error}
        />
      </div>
    );
  }

  if (isLoading || isFetching)
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <LoadingSpinner
          text="Obtendo informações do tipo de entrega"
          className="w-12 h-12"
        />
      </div>
    );

  const { createDeliveryPerson, updateDeliveryPerson, deleteDeliveryPerson } = new DeliveryPersonsService();

  const isEditMode = !!deliveryPerson;

  function getDefaultValues() {
    if (deliveryPerson) {
      return {
        id: deliveryPerson.id,
        name: deliveryPerson.name,
        status: deliveryPerson.status,
        created_by: "admin",
      };
    }

    return {
      created_by: "admin",
    };
  }

  function validateFormData(data: DeliveryPerson) {
    DeliveryPersonsFormCreateValidation.parse(data);
  }

  async function onSubmit(data: DeliveryPerson) {
    if (isEditMode) {
      return await updateDeliveryPerson(data as DeliveryPersonRequest);
    } else {
      return await createDeliveryPerson(data as DeliveryPersonRequest);
    }
  }

  return (
    <RenderForm<DeliveryPerson>
      resolver={DeliveryPersonsFormCreateValidation}
      getDefaultValues={getDefaultValues}
      onValidate={validateFormData}
      onInvalid={(errors) => console.log(errors)}
      onSubmit={onSubmit}
      onDelete={deleteDeliveryPerson}
      onRender={({ form, params: { onSubmit } }) => {
        return (
          <div className="flex flex-col gap-6">
            <div className="">
              <div className="grid items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Detalhes do tipo de entrega</CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="name" required>
                            Nome
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Adicione o nome do tipo de entrega"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="status" required>
                            Status
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o status do tipo de entrega" />
                              </SelectTrigger>
                            </FormControl>
                            <FormMessage />

                            <SelectContent>
                              <SelectItem value="enabled">Ativo</SelectItem>
                              <SelectItem value="draft">Rascunho</SelectItem>
                              <SelectItem value="archived">
                                Arquivado
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-end gap-x-2">
              {isEditMode && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => deleteDeliveryPerson(deliveryPerson.id)}
                >
                  Excluir
                </Button>
              )}

              <SubmitDialog<DeliveryPerson>
                isEditMode={isEditMode}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        );
      }}
    />
  );
}
