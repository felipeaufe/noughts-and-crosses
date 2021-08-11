export interface IScoreboard {
  player_x: IPlayer,
  player_o: IPlayer,
}

interface IPlayer {
  count: number,
  element: Element
}