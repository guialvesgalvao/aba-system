import { cn } from "@/lib/utils";

interface ILoadingSpinnerProps {
  text?: string;
  className?: string;
}

export function LoadingSpinner(props: ILoadingSpinnerProps) {
  const { text, className } = props;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("animate-spin", className)}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <p>{text}</p>
    </div>
  );
}
