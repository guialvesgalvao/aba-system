import z from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

import { Button } from "../../ui/button";

import { Switch } from "@/components/ui/switch";

import { Input } from "../../ui/input";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFieldArray, useFormContext } from "react-hook-form";

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
import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { FormDialog } from "@/components/utilities/form-dialog";
import { useMutation } from "@tanstack/react-query";

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
  cnpj: z.string().optional(),
  created_by: z.string(),
});

export type SuppliersFormValidationType = z.infer<
  typeof SuppliersFormCreateValidation
>;

interface ISuppliersFormProps extends FormResponse<Supplier> {
  trigger?: React.ReactNode;
}

export function SuppliersForm(props: Readonly<ISuppliersFormProps>) {
  const { trigger } = props;
  const [open, setOpen] = useState(false);

  return (
    <FormDialog
      title="Criar fornecedor"
      trigger={trigger}
      open={open}
      setOpen={setOpen}
    >
      <RenderSupplierForm {...props} setOpen={setOpen} />
    </FormDialog>
  );
}

interface IRenderSupplierForm extends ISuppliersFormProps {
  setOpen: (open: boolean) => void;
}

function RenderSupplierForm(props: Readonly<IRenderSupplierForm>) {
  const { formKeys, item: supplier, isFetching, isLoading, setOpen } = props;
  const { control, handleSubmit } = useFormContext<Supplier>();
  const { fields, append, remove } = useFieldArray({
    name: "filhos",
    control: control,
  });

  const { createSupplier, updateSupplier, deleteSupplier } =
    new SuppliersService();

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: formKeys,
    mutationFn: handleWhichAction,
  });

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
    mutate(data);
  }

  async function handleWhichAction(data: Supplier) {
    if (isEditMode) {
      await updateSupplier(data as SupplierRequest);
    } else {
      await createSupplier(data as SupplierRequest);
    }

    toast({
      variant: "default",
      title: "Fornecedor salvo com sucesso",
      description: "O Fornecedor foi salvo com sucesso",
    });

    setOpen(false);
  }

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

  if (isPending) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <LoadingSpinner
          text="Salvando informações do fornecedor"
          className="w-12 h-12"
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
                      name="cnpj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="cnpj">CNPJ (Opcional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Adicione o CNPJ fornecedor"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="automatic_invoicing"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="automatic_invoicing">
                            Faturamento Automático
                          </Label>
                          <FormControl>
                            <Switch
                              id="automatic_invoicing"
                              value={field.name}
                              defaultChecked={false}
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
