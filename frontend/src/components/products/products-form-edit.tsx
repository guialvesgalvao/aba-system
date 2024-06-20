import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Button } from "../ui/button";

import { Input } from "../ui/input";

import { Textarea } from "../ui/textarea";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";

import { ProductModel } from "@/shared/models/products-model";

const ProductsFormValidation = z.object({
  id: z.number(),
  title: z
    .string()
    .min(1, "Adicione um nome ao produto")
    .max(255, "Adicione no máximo 255 caracteres"),
  description: z.string().optional(),
  active: z.boolean().default(true),
  created_at: z.string(),
  updated_at: z.string(),
});

type ProductsFormValidationType = z.infer<typeof ProductsFormValidation>;

interface ProductsFormEditProps {
  product: ProductModel;
}

export function ProductsFormEdit(props: ProductsFormEditProps) {
  const { product } = props;

  const form = useForm<ProductsFormValidationType>({
    resolver: zodResolver(ProductsFormValidation),
    // Resolver essa parte do código comentada
    //@ts-ignore
    defaultValues: product,
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = form;

  function onSubmit(data: ProductsFormValidationType) {
    const product = ProductsFormValidation.parse(data);

    console.log(product);
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Id</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormDescription>Identificador único do produto.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title">Nome</FormLabel>
              <FormControl>
                <Input placeholder="Adicione o nome do produto..." {...field} />
              </FormControl>

              <FormDescription>
                Este é o nome do produto que será exibido.
              </FormDescription>
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
                  placeholder="Diga um pouco sobre o produto"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Você pode adicionar uma descrição para o produto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ativo</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ? "true" : "false"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o Status do produto" />
                  </SelectTrigger>
                </FormControl>
                <FormDescription>
                  Se o produto está ativo ou não.
                </FormDescription>

                <SelectContent>
                  <SelectItem value="true">Sim</SelectItem>
                  <SelectItem value="false">Não</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isValid}>
          Editar produto
        </Button>
      </form>
    </Form>
  );
}
