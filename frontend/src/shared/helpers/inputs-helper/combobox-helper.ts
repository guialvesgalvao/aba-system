import { OptionValue } from "@/components/combobox/interface";

export function groupByHeading(options: OptionValue[]): Record<string, OptionValue[]> {
  const groupedOptions: Record<string, OptionValue[]> = {};

  options.forEach((option) => {
    if (option.heading) {
      if (!groupedOptions[option.heading]) {
        groupedOptions[option.heading] = [];
      }

      groupedOptions[option.heading].push(option);
    } else {
      if (!groupedOptions[""]) {
        groupedOptions[""] = [];
      }

      groupedOptions[""].push(option);
    }
  });

  return groupedOptions;
}
