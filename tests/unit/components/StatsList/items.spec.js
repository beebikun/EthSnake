import getWrapper from './utils';

const ITEMS = [
  { key: 'key1', title: 'Title1', value: 1 },
  { key: 'key2', title: 'Title2', value: 2 },
];
const NO_VALUES = ITEMS.map(i => ({ ...i, value: undefined }));
const SRC = {
  'key1': 10,
  'key2': 20,
};
const NO_NUMBERS_SRC = {
  'key1': 'no number',
  'key2': [{value: 20}],
};
const STATS = ITEMS.reduce((b, i) => ({...b, [ i.key ] : { min: 0, max: 100 } }), {});
const ITEMS_VALUES = ITEMS.map(i => i.value);
const SRC_VALUES = ITEMS.map(i => SRC[i.key]);


it.each`
  items          | src                 | expectedValues    | blocksStats
  ${ NO_VALUES } | ${ SRC }            | ${ SRC_VALUES }   | ${ null }
  ${ ITEMS }     | ${ SRC }            | ${ ITEMS_VALUES } | ${ null }
  ${ ITEMS }     | ${ SRC }            | ${ SRC_VALUES }   | ${ STATS }
  ${ ITEMS }     | ${ NO_NUMBERS_SRC } | ${ ITEMS_VALUES } | ${ STATS }
`('Has bars: $STATS; $expectedValues', expectItems);

function expectItems({ items, src, expectedValues, blocksStats }) {
  const wrapper = getWrapper({
    src,
    blocksStats: blocksStats || {},
    isBlockStats: true,
    items,
  });
  const dts = wrapper.findAll('dt');
  const dds = wrapper.findAll('dd');

  expect(dts)
    .toHaveLength(items.length);
  expect(dds)
    .toHaveLength(items.length);

  items.forEach(({ title }, i) => {
    const dt = dts.at(i);
    expect(dt.exists())
      .toBe(true);
    expect(dt.text())
      .toEqual(title + ':');

    const dd = dds.at(i);
    expect(dd.exists())
      .toBe(true);
    const value = expectedValues[i];
    expect(dd.text())
      .toEqual(value.toString());

    const stats = dd.find('.stats');
    if (blocksStats) {
      expect(stats.exists())
        .toBe(true);
      expect(stats.attributes('style'))
        .toMatch(/width: \d+\.\d+%;/);
    } else {
      expect(stats.exists())
        .toBe(false);
    }
  });
}
