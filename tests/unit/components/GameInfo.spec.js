import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Store from '@/store';
import GameInfo from '@/components/GameInfo.vue';

const localVue = createLocalVue();
localVue.use(Vuex);


it('style', () => {
  const wrapper = shallowMount(GameInfo, { localVue, store: Store });
  const top = Store.state.game.SIZE.side * Store.state.game.SIZE.h;
  expect(wrapper.attributes('style'))
    .toEqual(`top: ${ top }px;`)
});