import { RenderForm } from "@/components/render-form/render-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { FieldErrors, useFieldArray } from "react-hook-form";
import z from "zod";

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
  teste: z.array(
    z.object({
      text: z.string(),
      name: z.enum(["enabled", "draft", "archived"]),
    }),
    {
      required_error: "Adicione um produto",
    }
  ),
});

export type ProductsFormValidationType = z.infer<
  typeof ProductsFormCreateValidation
>;

export function RepeaterTeste() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <RenderForm<ProductsFormValidationType>
        resolver={ProductsFormCreateValidation}
        getDefaultValues={function () {
          return {
            id: 1,
            name: "teste",
            description: "teste",
            status: "enabled",
            created_by: "teste",
          };
        }}
        onValidate={function (data: any): void {
          console.log(data);
        }}
        onInvalid={function (errors: FieldErrors<any>): void {
          console.log("getDefaultValues");
        }}
        onSubmit={function (data: any): Promise<any> {
          console.log("getDefaultValues");
          return Promise.resolve(data);
        }}
        onRender={({ form }) => {
          const { append, fields, remove } = useFieldArray({
            control: form.control,
            name: "teste",
          });

          return (
            <div className="flex flex-col gap-6">
              Fora do repeater
              <div className="flex flex-col gap-6">
                {fields.map((item, index) => (
                  <div className="flex flex-col gap-2">
                    <Label className="text-lg">Item {index}</Label>

                    <div className="flex items-end gap-2">
                      <FormField
                        control={form.control}
                        name={`teste.${index}.name`}
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
                        name={`teste.${index}.text`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="status" required>
                              Text
                            </FormLabel>
                            <Input className="h-9" {...field} />
                          </FormItem>
                        )}
                      />

                      {fields.length > 1 && (
                        <Button
                          variant="destructive"
                          className="h-9"
                          onClick={() => remove(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    append({
                      name: "enabled",
                      text: "1232",
                    })
                  }
                >
                  Adicionar novo
                </Button>
              </div>
              <Button type="submit">Enviar</Button>
            </div>
          );
        }}
      />
    </div>
  );
}
