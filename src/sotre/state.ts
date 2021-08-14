import { DifficultyEnum } from '../enums/difficulty.enum'
import { Observer } from '../util/Observer';

let state = {
  difficulty: DifficultyEnum.EASY
};

export const store = {
  state,
  setDifficulty (difficulty: DifficultyEnum) {
    this.state = {
      ...this.state,
      difficulty
    }
  },
  watch: null as any
};

store.watch = new Observer(store, 'state');