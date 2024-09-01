import { OptionValue } from "@/components/combobox/interface";
import { FieldErrors, FieldValues } from "react-hook-form";

export function errorsAsStringMessages<T extends FieldValues>(
  errors: FieldErrors<T>
): string[] {
  const errorsAsArray = Object.entries(errors);

  const messages = errorsAsArray.map(
    ([name, error]) => error?.message?.toString() ?? name + " is invalid"
  );

  return messages;
}

export async function getPromiseAsOptions<T>(
  promise: Promise<T[]>,
  mapFn: (item: T) => OptionValue
): Promise<OptionValue[]> {
  const options = await promise;
  return options.map(mapFn);
}
