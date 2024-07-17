import { Column } from "@tanstack/react-table";

export function getShortedText(maxLength = 30, text?: string) {
  if (!text || text?.length == 0) return "";

  const shortText =
    text?.length > maxLength ? text?.slice(0, maxLength) + "..." : text;

  return shortText;
}

export function getHeaderName<T>(column: Column<T, unknown>) {
  const columnDef = column.columnDef;
  const header = columnDef.header;

  if (!header) {
    return column.id;
  }

  if (typeof header === "string") {
    return header;
  }

  return column.id;
}

export function generatePaginationPages(
  pagination: { page: number; total: number; size: number },
  limit = 3
) {
  const { page, total, size } = pagination;

  const rowsTotal = Math.ceil(total / size);
  const pagesFromMinusToMax = Array.from(
    { length: rowsTotal },
    (_, i) => i + 1
  );

  if (page <= 0) {
    return pagesFromMinusToMax.slice(0, limit);
  }

  if (page >= rowsTotal - 1) {
    return pagesFromMinusToMax.slice(-limit);
  }

  return pagesFromMinusToMax.slice(page - 1, page + 2);
}
