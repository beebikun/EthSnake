import actions from '@/store/actions';

describe('add block', () => {
  it('block with number', () => {
    const block = { number: 1 };
    const commit = jest.fn();
    actions.addBlock({ commit }, block);
    expect(commit)
      .toHaveBeenCalledTimes(1);
    expect(commit)
      .toHaveBeenCalledWith('addBlock', { ...block, id: block.number });
  });
});
