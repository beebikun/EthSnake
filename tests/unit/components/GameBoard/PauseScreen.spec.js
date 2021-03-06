import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Store from '@/store';
import PauseScreen from '@/components/GameBoard/PauseScreen.vue';

const localVue = createLocalVue();
localVue.use(Vuex);


it.each`
  gameState       | header                 | sub
  ${ 'RUN' }      | ${ '' }                | ${ '' }
  ${ 'PAUSE' }    | ${ 'PAUSE' }           | ${ 'RESUME the game' }
  ${ 'GAMEOVER' } | ${ 'You lose T_T' }    | ${ 'START again' }
  ${ 'WIN' }      | ${ 'You win =^_^= !' } | ${ 'START again' }
`('$gameState: $header | Press SPACE to $sub', ({ gameState, header, sub }) => {
  Vue.set(Store.state.game, 'STATE', gameState);
  const wrapper = shallowMount(PauseScreen, { localVue, store: Store });
  const headerElement = wrapper.find('h1');
  expect(headerElement.text())
    .toEqual(header);
  const subElement = wrapper.find('p');
  expect(subElement.text())
    .toEqual(('Press SPACE to ' + sub).trim());
});
