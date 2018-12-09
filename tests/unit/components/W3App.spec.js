import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import W3App from '@/components/W3App.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const BLOCKS_COUNT = 10;
const LAST_BLOCK = Math.ceil(Math.random() * 10 ** 7);

it('render without crashing', () => {
  const eth = getMockedEth();
  const { store } = getStore();
  const wrapper = shallowMount(W3App, { propsData: { eth }, localVue, store });

  expect(wrapper.vm.$store)
    .toBeInstanceOf(Object);
  expect(wrapper.vm.blocks)
    .toEqual([]);
});


it('fetch blocks', async () => {
  const p = Promise.resolve(LAST_BLOCK);
  const eth = getMockedEth(p);
  const { store, actions } = getStore();
  const mockedFetch = jest.spyOn(W3App.extendOptions.methods, 'fetchBlocks');
  const wrapper = shallowMount(W3App, { propsData: { eth }, localVue, store });

  await p; // wait for fetch has been called

  expect(mockedFetch)
    .toHaveBeenCalledTimes(1);
  expect(eth.getBlockNumber)
    .toHaveBeenCalledTimes(1);
  expect(eth.getBlock.request)
    .toHaveBeenCalledTimes(BLOCKS_COUNT);
  expect(eth.BatchRequestAdd)
    .toHaveBeenCalledTimes(BLOCKS_COUNT);
  expect(eth.BatchRequestExecute)
    .toHaveBeenCalledTimes(1);

  expect(actions.addBlock)
    .toHaveBeenCalledTimes(BLOCKS_COUNT);
  expect(wrapper.vm.blocks)
    .toHaveLength(BLOCKS_COUNT);

  const items = wrapper.findAll({ name: 'BlockInfo' });
  expect(items)
    .toHaveLength(BLOCKS_COUNT);
});


function getStore() {
  const actions = {
    addBlock: jest.fn(({ state }, block) => {
      state.blocks.push(block);
    }),
  };
  const store = new Vuex.Store({
    state: {
      blocks: [],
    },
    actions,
  });

  return { store, actions };
}


function getMockedEth(p = Promise.resolve(LAST_BLOCK)) {
  const _requests = [];
  const BatchRequestAdd = jest.fn((getBlock) => {
    _requests.push(getBlock);
  });
  const BatchRequestExecute = jest.fn(() => {
    _requests.forEach((getBlock) => {
      getBlock();
    });
  });

  return {
    getBlockNumber: jest.fn(() => p),
    BatchRequestAdd,
    BatchRequestExecute,
    BatchRequest,
    getBlock: {
      request: jest.fn((number, cb) => {
        return () => {
          cb(null, {
            number,
          });
        };
      }),
    }
  };

  function BatchRequest() {
    return {
      add: BatchRequestAdd,
      execute: BatchRequestExecute,
    };
  }
}
