import { shallowMount } from '@vue/test-utils';
import GameState from '@/store/game/state';
import BgTile from '@/components/BgTile.vue';

const idx = '1';
const TILE = GameState.tiles[idx];

describe('tile style', () => {
  const wrapper = shallowMount(BgTile, { propsData: { tile: TILE } });
  const style = wrapper.attributes('style');

  it.each`
    name         | value
    ${ 'left' }  | ${ TILE.style.left }
    ${ 'top' }   | ${ TILE.style.top }
    ${ 'width' } | ${ TILE.style.width }
    ${ 'height' }| ${ TILE.style.height }
  `('expect $name to be $value', expectStyle);

  function expectStyle({ name, value }) {
    expect(style)
      .toMatch(new RegExp(`${ name }: ${ value };`));
  }
});