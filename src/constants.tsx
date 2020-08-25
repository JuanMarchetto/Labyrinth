export enum GAME_STATUS {
  WIN,
  LOSE,
  PLAYING,
  EDIT
}
export const ARROW = {
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
  UP: 'ArrowUp',
  LEFT: 'ArrowLeft',
};

export type Position = [/** row */ number, /** col */ number];