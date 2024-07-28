import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent } from "../ui/tooltip";

interface ISignatureTextProps {
  children: string;
}

export function SignatureText(props: Readonly<ISignatureTextProps>) {
  const { children } = props;

  return (
    <Tooltip>
      <TooltipTrigger>
        <span className="cursor-pointer">
          <strong className="text-primary font-medium">{children}</strong>
        </span>
      </TooltipTrigger>
      <TooltipContent>O melhor sistema do Brasil</TooltipContent>
    </Tooltip>
  );
}
