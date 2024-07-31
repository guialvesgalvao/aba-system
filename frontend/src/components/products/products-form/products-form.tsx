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

import { Product } from "@/shared/factories/products-factory";
import ProductsService from "@/shared/services/products-service";
import { ProductRequest } from "@/shared/types/products-types";

import { SubmitDialog } from "./products-form-dialogs";
import { RenderForm } from "@/components/render-form/render-form";
import { FormResponse } from "@/components/form-request/form-request";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";
import { ErrorMessage } from "@/components/error-message/error-message";
import { AlertCircle } from "lucide-react";

const ProductsFormCreateValidation = z.object({
  id: z
    .number()
    .positive("O ID do produto deve ser um número positivo")
    .optional(),
  name: z
    .string({
      required_error: "Adicione um nome ao produto",
    })
    .min(1, "Adicione um nome ao produto")
    .max(255, "Adicione no máximo 255 caracteres"),
  description: z.string().optional().nullable(),
  status: z.enum(["enabled", "draft", "archived"], {
    required_error: "Selecione o status do produto",
  }),
  created_by: z.string(),
});

export type ProductsFormValidationType = z.infer<
  typeof ProductsFormCreateValidation
>;

interface IProductsFormProps extends FormResponse<Product> {}

export function ProductsForm(props: Readonly<IProductsFormProps>) {
  const { item: product, isError, isFetching, isLoading, error } = props;

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
          text="Obtendo informações do produto"
          className="w-12 h-12"
        />
      </div>
    );

  const { createProduct, updateProduct, deleteProduct } = new ProductsService();

  const isEditMode = !!product;

  function getDefaultValues(): ProductsFormValidationType {
    if (product) {
      return {
        id: product.id,
        name: product.name,
        description: product?.description ?? "",
        status: product.status,
        created_by: "admin",
      };
    }

    return {
      name: "",
      description: "",
      created_by: "admin",
      status: "enabled",
    };
  }

  function validateFormData(data: Product) {
    ProductsFormCreateValidation.parse(data);
  }

  async function onSubmit(data: Product) {
    if (isEditMode) {
      return await updateProduct(data as ProductRequest);
    } else {
      return await createProduct(data as ProductRequest);
    }
  }

  return (
    <RenderForm<Product>
      resolver={ProductsFormCreateValidation}
      getDefaultValues={getDefaultValues}
      onValidate={validateFormData}
      onInvalid={(errors) => console.log(errors)}
      onSubmit={onSubmit}
      onDelete={deleteProduct}
      onRender={({ form, params: { onSubmit } }) => {
        return (
          <div className="flex flex-col gap-6">
            <div className="">
              <div className="grid items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Detalhes do produto</CardTitle>
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
                              placeholder="Adicione o nome do produto"
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
                                <SelectValue placeholder="Selecione o status do produto" />
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

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="description">Descrição</FormLabel>
                          <FormControl>
                            <Textarea
                              className="resize-none"
                              placeholder="Diga um pouco sobre o produto"
                              rows={6}
                              {...field}
                              value={field?.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
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
                  onClick={() => deleteProduct(product.id)}
                >
                  Excluir
                </Button>
              )}

              <SubmitDialog<Product>
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
