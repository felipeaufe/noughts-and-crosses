import { Observer } from '../util/Observer';
import { state } from './state';

export const watches = {
  difficulty: new Observer(state, 'difficulty'),
  currentPlayer: new Observer(state.player, 'current'),
}