import { Button } from "@/components/ui/button";

interface IPaginationPageSizeProps {
  sizes: number[];
  currentPageSize: number;
  setPageSize: (pageSize: number) => void;
}

export function PaginationPageSize(props: Readonly<IPaginationPageSizeProps>) {
  const { sizes, currentPageSize, setPageSize } = props;

  function handlePageSizeChange(size: number) {
    setPageSize(size);
  }

  return (
    <div className="flex items-center gap-1">
      {sizes.map((size) => (
        <Button
          key={size}
          onClick={() => handlePageSizeChange(size)}
          size="sm"
          variant={currentPageSize === size ? "outline" : "ghost"}
        >
          {size}
        </Button>
      ))}
    </div>
  );
}
