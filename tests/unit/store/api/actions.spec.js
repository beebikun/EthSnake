import Eth from 'web3-eth';
import actions from '@/store/api/actions';


it('add block', () => {
  const idx = '1';
  const block = { number: 1, gasLimit: 10, gasUsed: 4 };
  const commit = jest.fn();
  const dispatch = jest.fn();

  actions.addBlock({ commit, dispatch }, { block, idx });

  const expectedBlock = { ...block, idx, id: 'block_' + idx };
  expect(commit)
    .toHaveBeenNthCalledWith(1, 'addBlock', expectedBlock);
  expect(commit)
    .toHaveBeenNthCalledWith(2, 'addStats', expectedBlock);
  expect(dispatch)
    .toHaveBeenCalledWith('addToken', idx);
});


it('showTransactions', () => {
  const idx = '1';
  const commit = jest.fn();
  actions.showTransactions({ commit }, idx);
  expect(commit)
    .toHaveBeenCalledWith('showTransactions', idx);
});


describe('set eth', () => {
  it('set when no eth was set', () => {
    const eth = { hello: 'there' };
    const commit = jest.fn();
    const dispatch = jest.fn();
    const state = {};

    actions.setEth({ commit, dispatch, state }, eth);

    expect(commit)
      .toHaveBeenCalledWith('setEth', eth);
    expect(dispatch)
      .toHaveBeenCalledWith('fetchBlocks');
  });
  it('do not set twice', () => {
    const eth = { hello: 'there' };
    const commit = jest.fn();
    const dispatch = jest.fn();
    const state = { eth: 'something' };

    actions.setEth({ commit, dispatch, state }, eth);

    expect(commit)
      .not.toHaveBeenCalled();
    expect(dispatch)
      .not.toHaveBeenCalled();
  });
});


describe('fetch bocks', () => {
  it('normal blocks', async () => {
    const eth = new Eth();
    const state = { LOAD_BLOCKS_COUNT: 5, eth };
    const dispatch = jest.fn();
    const commit = jest.fn();

    await actions.fetchBlocks({ commit, dispatch, state });

    expect(eth.getBlockNumber)
      .toHaveBeenCalledTimes(1);
    expect(eth.getBlock.request)
      .toHaveBeenCalledTimes(state.LOAD_BLOCKS_COUNT);
    expect(eth.BatchRequestAdd)
      .toHaveBeenCalledTimes(state.LOAD_BLOCKS_COUNT);
    expect(eth.BatchRequestExecute)
      .toHaveBeenCalledTimes(1);

    expect(commit)
      .toHaveBeenCalledWith('clearBlocks');

    expect(dispatch)
      .toHaveBeenCalledTimes(state.LOAD_BLOCKS_COUNT + 2);
    const expectedBlock = expect.objectContaining({
      idx: expect.any(Number),
      block: expect.any(Object),
    });
    expect(dispatch)
      .toHaveBeenCalledWith('addBlock', expectedBlock);
    expect(dispatch)
      .toHaveBeenLastCalledWith('resume');
    expect(dispatch)
      .toHaveBeenNthCalledWith(1, 'showTransactions', null);
  });

  it('empty block', async () => {
    const eth = new Eth();
    eth.buildBlock.mockReturnValueOnce(null);
    const state = { LOAD_BLOCKS_COUNT: 1, eth };
    const dispatch = jest.fn();
    const commit = jest.fn();

    await actions.fetchBlocks({ commit, dispatch, state });

    expect(commit)
      .toHaveBeenCalledWith('clearBlocks');

    expect(dispatch)
      .toHaveBeenCalledTimes(2);
    expect(dispatch)
      .toHaveBeenNthCalledWith(1, 'showTransactions', null);
    expect(dispatch)
      .toHaveBeenNthCalledWith(2, 'resume');
  });
});
