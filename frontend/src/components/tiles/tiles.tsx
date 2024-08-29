import { Tile, TileElement } from "./tile";

interface ITilesProps {
  tiles: TileElement[];
}

export function Tiles(props: Readonly<ITilesProps>) {
  const { tiles } = props;

  return tiles.map((tile) => <Tile key={tile.title} {...tile} />);
}
