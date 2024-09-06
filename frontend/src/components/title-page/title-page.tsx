interface ITitlePageProps {
  title: string;
  subtitle?: string;
}

export function TitlePage(props: Readonly<ITitlePageProps>) {
  const { title, subtitle } = props;

  return (
    <div className="flex flex-col">
      <h4 className="text-2xl font-bold tracking-tight">{title}</h4>
      {subtitle && <p className="text-sm font-medium text-primary">{subtitle}</p>}
    </div>
  );
}
