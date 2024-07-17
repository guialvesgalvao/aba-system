import { cn } from "@/lib/utils";
import { Frown } from "lucide-react";

interface IErrorMessageProps {
  className?: string;
  icon?: React.ReactNode;
  error: Error | null;
}

export function ErrorMessage(props: IErrorMessageProps) {
  const { className, icon, error } = props;

  const message = error?.message ?? "Erro desconhecido";

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-red-700 flex flex-col items-center gap-2">
        {icon}
        <h2 className={cn("text-2xl text-center font-semibold", className)}>{message}</h2>
      </div>
    </div>
  );
}
