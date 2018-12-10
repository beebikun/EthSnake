const DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
};

export default {
  INIT_SIZE: 2,
  SPEED: 50,
  SPEED_STEP: 3,
  MIN_SPEED: 20,
  DIRECTIONS,
  direction: DIRECTIONS.UP,
  blocks: [],
  frameCount: 0,
};
