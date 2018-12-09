import state from './state';
import getters from './getters';

import snake from './snake';
import tokens from './tokens';

export default {
  state, getters,
  modules: { snake, tokens },
};
