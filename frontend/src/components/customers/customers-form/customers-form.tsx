import z from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

import {Button} from "../../ui/button";

import {Input} from "../../ui/input";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../ui/select";

import {Customer} from "@/shared/factories/customers-factory";
import CustomersService from "@/shared/services/customers-service";
import {CustomerRequest} from "@/shared/types/customers-types";
import {SubmitDialog} from "./customers-form-dialogs";
import {RenderForm} from "@/components/render-form/render-form";
import {FormResponse} from "@/components/form-request/form-request";
import {LoadingSpinner} from "@/components/loading-spinner/loading-spinner";
import {ErrorMessage} from "@/components/error-message/error-message";
import {AlertCircle} from "lucide-react";
import {useState} from "react";
import {FormDialog} from "@/components/utilities/form-dialog";
import {useMutation} from "@tanstack/react-query";
import {toast} from "@/components/ui/use-toast";

const CustomersFormCreateValidation = z.object({
  id: z
    .number()
    .positive("O ID do cliente deve ser um número positivo")
    .optional(),
  fantasy_name: z
    .string({
      required_error: "Adicione um nome fantasia ao cliente",
    })
    .min(1, "Adicione um nome ao cliente")
    .max(255, "Adicione no máximo 255 caracteres"),
  cnpj: z.string().length(14, "Adicione um CNPJ válido").optional(),
  state_registration: z.string().optional(),
  complete_address: z.string({
    required_error: "Adicione o endereço completo do cliente",
  }),
  delivery_address: z.string({
    required_error: "Adicione o endereço de entrega do cliente",
  }),
  status: z.enum(["enabled", "draft", "archived"], {
    required_error: "Selecione o status do cliente",
  }),
  created_by: z.string(),


});

export type CustomersFormValidationType = z.infer<
  typeof CustomersFormCreateValidation
>;

interface ICustomersFormProps extends FormResponse<Customer> {
  trigger?: React.ReactNode;
}

export function CustomersForm(props: Readonly<ICustomersFormProps>) {
  const {trigger} = props;
  const [open, setOpen] = useState(false);

  return (
    <FormDialog
      title="Criar cliente"
      trigger={trigger}
      open={open}
      setOpen={setOpen}
    >
      <RenderCustomerForm {...props} setOpen={setOpen}/>
    </FormDialog>
  );
}

interface IRenderCustomerForm extends ICustomersFormProps {
  setOpen: (open: boolean) => void;
}

function RenderCustomerForm(props: Readonly<IRenderCustomerForm>) {
  const {formKeys, item: customer, isFetching, isLoading, setOpen} = props;

  const {createCustomer, updateCustomer, deleteCustomer} =
    new CustomersService();

  const {mutate, isPending, isError, error} = useMutation({
    mutationKey: formKeys,
    mutationFn: handleWhichAction,
  });

  const isEditMode = !!customer;

  function getDefaultValues() {
    if (customer) {
      return {
        id: customer.id,
        fantasy_name: customer.fantasy_name,
        status: customer.status,
        created_by: "admin",
      };
    }

    return {
      created_by: "admin",
    };
  }

  function validateFormData(data: Customer) {
    CustomersFormCreateValidation.parse(data);
  }

  async function onSubmit(data: Customer) {
    mutate(data);
  }

  async function handleWhichAction(data: Customer) {
    if (isEditMode) {
      await updateCustomer(data as CustomerRequest);
    } else {
      await createCustomer(data as CustomerRequest);
    }

    toast({
      variant: "default",
      title: "Cliente salvo com sucesso",
      description: "O cliente foi salvo com sucesso",
    });

    setOpen(false);
  }

  if (isError) {
    return (
      <div className="px-10 py-10">
        <ErrorMessage
          icon={<AlertCircle className="w-14 h-14"/>}
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
          text="Salvando informações do cliente"
          className="w-12 h-12"
        />
      </div>
    );
  }

  if (isLoading || isFetching)
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <LoadingSpinner
          text="Obtendo informações do cliente"
          className="w-12 h-12"
        />
      </div>
    );

  return (
    <RenderForm<Customer>
      resolver={CustomersFormCreateValidation}
      getDefaultValues={getDefaultValues}
      onValidate={validateFormData}
      onInvalid={(errors) => console.log(errors)}
      onSubmit={onSubmit}
      onDelete={deleteCustomer}
      onRender={({form, params: {onSubmit}}) => {
        return (
          <div className="flex flex-col gap-6">
            <div className="">
              <div className="grid items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Detalhes do cliente</CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-6">
                    <FormField
                      control={form.control}
                      name="fantasy_name"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel htmlFor="name" required>
                            Nome Fantasia
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Adicione o nome fantasia do cliente"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cnpj"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel htmlFor="cnpj" required>
                            CNPJ
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Adicione o cnpj do cliente"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state_registration"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel htmlFor="state_registration" required>
                            Inscrição Estadual
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Adicione a inscrição estadual do cliente"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="complete_address"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel htmlFor="complete_address" required>
                            Endereço Completo
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Adicione o endereço completo do cliente"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="delivery_address"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel htmlFor="delivery_address" required>
                            Endereço de Entrega
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Adicione o endereço de entrega do cliente"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({field}) => (
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
                                <SelectValue
                                  placeholder="Selecione o status do cliente"/>
                              </SelectTrigger>
                            </FormControl>
                            <FormMessage/>

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
                  onClick={() => deleteCustomer(customer.id)}
                >
                  Excluir
                </Button>
              )}

              <SubmitDialog<Customer>
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
