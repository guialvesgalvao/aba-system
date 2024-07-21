import { Card, CardContent, CardTitle,CardHeader } from "../ui/card"
import { Package } from 'lucide-react'; // substitua LucideIconName pelo nome do ícone desejado

interface ITileProps {
    title: string;
    value: string;
    percentage: string;
    description: string;
}

export function Tile ({title, value, percentage, description}:Readonly<ITileProps>  ) {

    return(
        <Card className="w-full p-4 shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-sm text-gray-600">{title}</CardTitle>
          <Package className="w-6 h-6 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-green-500">{percentage}</div>
          <div className="text-xs text-gray-500">{description}</div>
        </CardContent>
      </Card>
    )
} 