import {
  ComponentRequest,
  IComponentRequestProps,
} from "../component-request/component-request";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface ICardDataProps<T> {
  title: string;
  description: string;
  table?: IComponentRequestProps<T>;
}

export function CardData<T>(props: Readonly<ICardDataProps<T>>) {
  const { title, description, table } = props;

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
        {table ? <ComponentRequest<T> {...table} /> : null}
      </CardContent>
    </Card>
  );
}
