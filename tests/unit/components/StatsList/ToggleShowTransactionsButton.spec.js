import getWrapper from './utils';

it.each`
  transactionsToggleIdx | isExists
  ${ 1 }                | ${ true }
  ${ null }             | ${ false }
`('$transactionsToggleIdx => $isExists',
  ({ transactionsToggleIdx, isExists }) => {
    const item = {
      key: 'key', title: 'title',
      transactionsToggleIdx,
    };
    const wrapper = getWrapper({ items: [ item ] });
    const dts = wrapper.findAll('dt');
    expect(dts)
      .toHaveLength(1);
    const btn = wrapper.find({ name: 'ToggleShowTransactionsButton' });
    expect(btn.exists())
      .toBe(isExists);
});