interface IPaginationCounterProps {
  strings?: {
    page: string;
    records: string;
  };
  pageSize: number;
  pageIndex: number;
  rowCount: number;
}

export function PaginationCounter(props: Readonly<IPaginationCounterProps>) {
  const {
    strings = {
      page: "Página {pageIndex} de {pageCount}",
      records: "{rowCount} registros",
    },
    pageSize,
    pageIndex,
    rowCount,
  } = props;

  const pageTextFormatted = strings.page
    .replace("{pageIndex}", (pageIndex + 1).toString())
    .replace("{pageCount}", (Math.ceil(rowCount / pageSize) || 1).toString());

  const recordsTextFormatted = strings.records.replace(
    "{rowCount}",
    rowCount.toString()
  );

  return (
    <p title={pageTextFormatted} className="text-muted-foreground text-sm">
      {pageTextFormatted} <span>({recordsTextFormatted})</span>
    </p>
  );
}
