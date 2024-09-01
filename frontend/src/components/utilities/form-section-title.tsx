import { Separator } from "../ui/separator";

interface IFormSectionTitleProps {
  title: string;
}

export function FormSectionTitle(props: Readonly<IFormSectionTitleProps>) {
  const { title } = props;

  return (
    <div className="flex items-center py-4 gap-4">
      <Separator className="shrink-1" />
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      <Separator className="shrink-1" />
    </div>
  );
}
