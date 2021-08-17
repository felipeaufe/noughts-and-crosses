import { state } from './state';

export const getters = {
  getDifficulty () {
    return state.difficulty;
  },
  getCurrentPlayer () {
    return state.player.current;
  },
}