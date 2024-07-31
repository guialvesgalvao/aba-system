import { Tile, TileElement } from "./tile";

interface ITilesProps {
  tiles: TileElement[];
}

export function Tiles(props: Readonly<ITilesProps>) {
  const { tiles } = props;

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 transition-all">
      {tiles.map((tile) => (
        <Tile key={tile.title} {...tile} />
      ))}
    </div>
  );
}
