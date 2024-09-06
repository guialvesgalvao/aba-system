export type OptionValue = {
  /**
   * This is a generic type, so it can be any value that the user wants to store
   */
  data: unknown;

  /**
   * This is a string that will be used as the value of the option
   */
  value: string;

  /**
   * This is the label that will be displayed to the user
   */
  label: string;

  /**
   * This is an optional string that will be used as the heading of the option
   */
  heading?: string;
};
