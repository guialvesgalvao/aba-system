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

import { Supplier } from "@/shared/factories/suppliers-factory";
import SuppliersService from "@/shared/services/suppliers-service";
import { SupplierRequest } from "@/shared/types/suppliers-types";

import { SubmitDialog } from "./suppliers-form-dialogs";
import { RenderForm } from "@/components/render-form/render-form";
import { FormResponse } from "@/components/form-request/form-request";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";
import { ErrorMessage } from "@/components/error-message/error-message";
import { AlertCircle, Frown } from "lucide-react";

const SuppliersFormCreateValidation = z.object({
  id: z
    .number()
    .positive("O ID do fornecedor deve ser um número positivo")
    .optional(),
  name: z
    .string({
      required_error: "Adicione um nome ao fornecedor",
    })
    .min(1, "Adicione um nome ao fornecedor")
    .max(255, "Adicione no máximo 255 caracteres"),
  status: z.enum(["enabled", "draft", "archived"], {
    required_error: "Selecione o status do fornecedor",
  }),
  created_by: z.string(),
});

export type SuppliersFormValidationType = z.infer<
  typeof SuppliersFormCreateValidation
>;

interface ISuppliersFormProps extends FormResponse<Supplier> {}

export function SuppliersForm(props: ISuppliersFormProps) {
  const { item: supplier, isError, isFetching, isLoading, error } = props;

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
          text="Obtendo informações do fornecedor"
          className="w-12 h-12"
        />
      </div>
    );

  const { createSupplier, updateSupplier, deleteSupplier } = new SuppliersService();

  const isEditMode = !!supplier;

  function getDefaultValues() {
    if (supplier) {
      return {
        id: supplier.id,
        name: supplier.name,
        status: supplier.status,
        cnpj: supplier.cnpj,
        automatic_invoicing: supplier.automatic_invoicing,
        created_by: "admin",
      };
    }

    return {
      created_by: "admin",
    };
  }

  function validateFormData(data: Supplier) {
    SuppliersFormCreateValidation.parse(data);
  }

  async function onSubmit(data: Supplier) {
    if (isEditMode) {
      return await updateSupplier(data as SupplierRequest);
    } else {
      return await createSupplier(data as SupplierRequest);
    }
  }

  return (
    <RenderForm<Supplier>
      resolver={SuppliersFormCreateValidation}
      getDefaultValues={getDefaultValues}
      onValidate={validateFormData}
      onInvalid={(errors) => console.log(errors)}
      onSubmit={onSubmit}
      onDelete={deleteSupplier}
      onRender={({ form, params: { onSubmit } }) => {
        return (
          <div className="flex flex-col gap-6">
            <div className="">
              <div className="grid items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Detalhes da Fornecedores</CardTitle>
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
                              placeholder="Adicione o nome do fornecedor"
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
                                <SelectValue placeholder="Selecione o status do fornecedor" />
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
                  onClick={() => deleteSupplier(supplier.id)}
                >
                  Excluir
                </Button>
              )}

              <SubmitDialog<Supplier>
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
