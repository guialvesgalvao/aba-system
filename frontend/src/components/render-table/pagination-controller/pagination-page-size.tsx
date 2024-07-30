import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="flex items-center space-x-2">
      <p className="text-sm font-medium">Linhas por página</p>
      <Select
        value={`${currentPageSize}`}
        onValueChange={(value) => handlePageSizeChange(Number(value))}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder={currentPageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {sizes.map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
