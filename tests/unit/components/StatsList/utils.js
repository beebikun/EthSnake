import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import StatsList from '@/components/StatsList.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

export default function getWrapper({ blocksStats={},
                                     transStats={},
                                     items=[],
                                     src={},
                                     isBlockStats=true }={}) {
  const store = getStore({ blocksStats, transStats });
  const wrapper = shallowMount(StatsList, {
    localVue, store,
    propsData: { items, isBlockStats, src },
  });
  expect(wrapper.vm.$store)
    .toBeInstanceOf(Object);
  return wrapper;
}

function getStore({ blocksStats={}, transStats={} }={}) {
  return new Vuex.Store({
    state: { api: {
      blocksStats, transStats,
    } },
  });
}
