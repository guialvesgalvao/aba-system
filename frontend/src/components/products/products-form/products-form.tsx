import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import {
  Form,
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

import { ImagePlus } from "lucide-react";
import { useRef } from "react";

import { Product } from "@/shared/factories/products-factory";
import ProductsService from "@/shared/services/products-service";
import { ProductRequest } from "@/shared/types/products-types";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SubmitDialog } from "./products-form-dialogs";

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
  description: z.string().optional(),
  status: z.enum(["enabled", "draft", "archived"]),
  image: z.any(),
  created_by: z.string(),
});

export type ProductsFormValidationType = z.infer<
  typeof ProductsFormCreateValidation
>;

interface IProductsFormProps {
  item?: Product;
}

export function ProductsForm(props: IProductsFormProps) {
  const { item: product } = props;

  const { createProduct, updateProduct, deleteProduct } = new ProductsService();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProductsFormValidationType>({
    resolver: zodResolver(ProductsFormCreateValidation),
    defaultValues: getDefaultValues(),
  });

  const isEditMode = !!product?.id;
  const {
    handleSubmit,
    formState: { isValid, isSubmitSuccessful, isSubmitting },
  } = form;

  function getDefaultValues() {
    if (product) {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        status: product.status,
        image: product.image,
        created_by: "admin",
      };
    }

    return {
      created_by: "admin",
    };
  }

  async function onSubmit(data: ProductsFormValidationType) {
    const product: ProductRequest = validateFormData(data);
    handleSubmitController(product);
  }

  function handleSubmitController(data: ProductRequest) {
    if (isEditMode) {
      return updateProduct(data);
    }

    return createProduct(data);
  }

  function validateFormData(data: ProductsFormValidationType) {
    const product = ProductsFormCreateValidation.parse(data);
    return product;
  }

  async function handleDelete() {
    if (!product?.id) return;

    await deleteProduct(product.id);
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          {isEditMode ? "Editar produto" : "Criar novo produto"}
        </h3>

        <h6>Produtos são utilizados nos pedidos</h6>
      </div>

      <Form {...form}>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
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
                        <FormLabel htmlFor="title">Nome</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Adicione o nome do produto..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea
                            className="resize-none"
                            placeholder="Diga um pouco sobre o produto"
                            rows={8}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Status do produto</CardTitle>
                </CardHeader>

                <CardContent>
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
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
                            <SelectItem value="archived">Arquivado</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Imagem do produto</CardTitle>
                </CardHeader>

                <CardContent>
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <Button
                          variant="secondary"
                          className="w-full h-40 flex items-center justify-center rounded-md p-0"
                          onClick={() => {
                            fileInputRef.current?.click();
                          }}
                        >
                          {!isEditMode ? (
                            <ImagePlus />
                          ) : (
                            <img
                              src={product?.image}
                              className="w-full h-full"
                            />
                          )}
                        </Button>

                        <FormControl>
                          <Input
                            className="hidden"
                            type="file"
                            placeholder="Adicione a imagem"
                            {...field}
                            value={""}
                            ref={fileInputRef}
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
                onClick={handleDelete}
              >
                Excluir
              </Button>
            )}

            <SubmitDialog isEditMode={isEditMode} onSubmit={onSubmit} />
          </div>
        </form>
      </Form>
    </div>
  );
}
