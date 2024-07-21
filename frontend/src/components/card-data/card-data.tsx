import {
  ComponentRequest,
  ComponentResponse,
} from "../component-request/component-request";
import { FormRequest, FormResponse } from "../form-request/form-request";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DialogContent, DialogTitle } from "../ui/dialog";

interface ICardDataProps<T> {
  title: string;
  description: string;

  table: {
    storage: string[];
    request: () => Promise<T[]>;
    component: (props: ComponentResponse<T>) => JSX.Element;
  };

  form: {
    name: string;
    request: (id: number) => Promise<T>;
    component: (props: FormResponse<T>) => JSX.Element;
  };
}

export function CardData<T>(props: Readonly<ICardDataProps<T>>) {
  const { title, description, table, form } = props;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="h-full">
        <ComponentRequest<T>
          storages={table.storage}
          request={table.request}
          component={table.component}
        />

        <DialogContent className="max-w-[1000px]">
          <DialogTitle>Editar Produto</DialogTitle>
          <FormRequest<T>
            form={form.name}
            request={form.request}
            component={form.component}
          />
        </DialogContent>
      </CardContent>
    </Card>
  );
}
