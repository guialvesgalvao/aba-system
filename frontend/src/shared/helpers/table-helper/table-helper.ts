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
