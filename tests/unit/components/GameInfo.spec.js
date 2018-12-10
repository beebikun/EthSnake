import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Store from '@/store';
import GameInfo from '@/components/GameInfo.vue';

const localVue = createLocalVue();
localVue.use(Vuex);


it.each`
  currState       | nextState
  ${ 'RUN' }      | ${ 'PAUSE' }
  ${ 'PAUSE' }    | ${ 'RESUME' }
  ${ 'GAMEOVER' } | ${ 'RUN' }
`('nextGameState: $currState => $nextState', ({ currState, nextState }) => {
  Vue.set(Store.state.game, 'STATE', currState);
  const wrapper = shallowMount(GameInfo, { localVue, store: Store });
  expect(wrapper.vm.nextGameState)
    .toEqual(nextState);
});

it('style', () => {
  const wrapper = shallowMount(GameInfo, { localVue, store: Store });
  const top = Store.state.game.SIZE.side * Store.state.game.SIZE.h;
  expect(wrapper.attributes('style'))
    .toEqual(`top: ${ top }px;`)
});