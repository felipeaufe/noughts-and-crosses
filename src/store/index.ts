import { getters } from './getters';
import { setters } from './setters';
import { watches } from './watches';

export const store = {
  ...getters,
  ...setters,
  watches,
};