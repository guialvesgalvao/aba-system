import { LoadingSpinner } from "../loading-spinner/loading-spinner";
import { Card, CardContent, CardTitle, CardHeader } from "../ui/card";

export type TileElement = {
  title: string;
  icon: React.ReactNode;
  value: string;
  percentage: string;
  description: string;
};

interface ITileProps extends TileElement {}

export function Tile(props: Readonly<ITileProps>) {
  const { title, icon, value, percentage, description } = props;

  const isLoading = false;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="hover:">
        {isLoading ? (
          <div className="h-20 flex items-center justify-center">
            <LoadingSpinner className="w-10 h-10" />
          </div>
        ) : (
          <>
            <div className="text-xl font-bold">{value}</div>
            <p
              title={percentage + " " + description}
              className="text-xs flex gap-1 text-muted-foreground"
            >
              <strong className="text-green-500 font-medium">
                {percentage}
              </strong>
              {description}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
