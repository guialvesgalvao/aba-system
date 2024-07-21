import { Tile } from "./tile";

export function Tiles () {
    const tiles = [
        {id: 1, title: "Total de vendas", value: "2323", percentage: "10%", description: "dasdsds dsad "},
        {id:2 ,title: "Total de vendas", value: "2323", percentage: "10%", description: "dasdsds dsad "},
        {id: 3, title: "Total de vendas", value: "2323", percentage: "10%", description: "dasdsds dsad "},
    ]

    return (
        <div>
        {tiles.map(tile => (
            <Tile 
            key={tile.id}
            title={tile.title}
            value={tile.value}
            percentage={tile.percentage}
            description={tile.description}
            />
        ))}
        </div>
    )
} 