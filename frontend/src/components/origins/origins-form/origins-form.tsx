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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../ui/select";

import { Origin } from "@/shared/factories/origins-factory";
import OriginsService from "@/shared/services/origins-service";
import { OriginRequest } from "@/shared/types/origins-types";

import { SubmitDialog } from "./origins-form-dialogs";
import { RenderForm } from "@/components/render-form/render-form";
import { FormResponse } from "@/components/form-request/form-request";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";
import { ErrorMessage } from "@/components/error-message/error-message";
import { AlertCircle } from "lucide-react";

const OriginsFormCreateValidation = z.object({
  id: z
    .number()
    .positive("O ID da origem deve ser um número positivo")
    .optional(),
  name: z
    .string({
      required_error: "Adicione um nome a origem",
    })
    .min(1, "Adicione um nome a origem")
    .max(255, "Adicione no máximo 255 caracteres"),
  status: z.enum(["enabled", "draft", "archived"], {
    required_error: "Selecione o status do origem",
  }),
  created_by: z.string(),
});

export type OriginsFormValidationType = z.infer<
  typeof OriginsFormCreateValidation
>;

interface IOriginsFormProps extends FormResponse<Origin> {}

export function OriginsForm(props: IOriginsFormProps) {
  const { item: origin, isError, isFetching, isLoading, error } = props;

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
          text="Obtendo informações da origem"
          className="w-12 h-12"
        />
      </div>
    );

  const { createOrigin, updateOrigin, deleteOrigin } = new OriginsService();

  const isEditMode = !!origin;

  function getDefaultValues() {
    if (origin) {
      return {
        id: origin.id,
        name: origin.name,
        status: origin.status,
        created_by: "admin",
      };
    }

    return {
      created_by: "admin",
    };
  }

  function validateFormData(data: Origin) {
    OriginsFormCreateValidation.parse(data);
  }

  async function onSubmit(data: Origin) {
    if (isEditMode) {
      return await updateOrigin(data as OriginRequest);
    } else {
      return await createOrigin(data as OriginRequest);
    }
  }

  return (
    <RenderForm<Origin>
      resolver={OriginsFormCreateValidation}
      getDefaultValues={getDefaultValues}
      onValidate={validateFormData}
      onInvalid={(errors) => console.log(errors)}
      onSubmit={onSubmit}
      onDelete={deleteOrigin}
      onRender={({ form, params: { onSubmit } }) => {
        return (
          <div className="flex flex-col gap-6">
            <div className="">
              <div className="grid items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Detalhes da Origem</CardTitle>
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
                              placeholder="Adicione o nome do origem"
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
                                <SelectValue placeholder="Selecione o status da origem" />
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
                  onClick={() => deleteOrigin(origin.id)}
                >
                  Excluir
                </Button>
              )}

              <SubmitDialog<Origin>
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
