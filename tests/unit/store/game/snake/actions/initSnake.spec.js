import actions from '@/store/game/snake/actions';

it('initSnake', () => {
  const dispatch = jest.fn();

  actions.initSnake({ dispatch});

  expect(dispatch)
    .toHaveBeenNthCalledWith(1, 'createSnake');
  expect(dispatch)
    .toHaveBeenNthCalledWith(2, 'drawSnake');
});
