import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import snake from './snake';
import tokens from './tokens';

export default {
  state, getters, actions, mutations,
  modules: { snake, tokens },
};
