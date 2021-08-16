import { DifficultyEnum } from '../enums/difficulty.enum';
import { PlayerEnum } from '../enums/board.enum';

export const state = {
  difficulty: DifficultyEnum.EASY,
  player: {
    current: PlayerEnum.PLAYER_X
  },
};