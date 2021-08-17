import { state } from './state';
import { DifficultyEnum } from '../enums/difficulty.enum';
import { PlayerEnum } from '../enums/board.enum';

export const setters = {
  setDifficulty (difficulty: DifficultyEnum) {
    state.difficulty = difficulty;
  },
  setCurrentPlayer (player: PlayerEnum) {
    state.player.current = player;
  },
}