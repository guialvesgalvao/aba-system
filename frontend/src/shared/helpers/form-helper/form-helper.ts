import { OptionValue } from "@/components/combobox/interface";
import { FieldErrors, FieldValues } from "react-hook-form";

/**
 * Convert errors object to an array of string messages
 * @param errors {FieldErrors<T>} Errors object
 * @returns  {string[]} Array of string messages
 */
export function errorsAsStringMessages<T extends FieldValues>(
  errors: FieldErrors<T>
): string[] {
  const errorsAsArray = Object.entries(errors);

  const messages = errorsAsArray.map(
    ([name, error]) => error?.message?.toString() ?? name + " is invalid"
  );

  return messages;
}

/**
 * Get a promise and map it to an array of options
 * @param promise {Promise<T[]>} Promise to be resolved to an array of options
 * @param mapFn  {Function} Function to map the array of options
 * @returns {Promise<OptionValue[]>} Promise resolved to an array of options
 */
export async function getPromiseAsOptions<T>(
  promise: Promise<T[]>,
  mapFn: (item: T) => OptionValue
): Promise<OptionValue[]> {
  const options = await promise;
  return options.map(mapFn);
}
