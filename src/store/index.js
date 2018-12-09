import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import api from './api';
import game from './game';

export default new Vuex.Store({
  modules: {
    api, game,
  },
});
