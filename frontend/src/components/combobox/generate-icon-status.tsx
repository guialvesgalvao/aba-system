import { ChevronsUpDown, OctagonAlert } from "lucide-react";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";

interface IGenerateIconProps {
  isError: boolean;
  isFetching: boolean;
}

export function GenerateIcon(props: Readonly<IGenerateIconProps>) {
  const { isError, isFetching } = props;

  if (isFetching) {
    return <LoadingSpinner className="h-5 w-5" />;
  }

  if (isError) {
    return <OctagonAlert className="h-5 w-5" />;
  }

  return <ChevronsUpDown className="h-5 w-5" />;
}
