const DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
};

const INIT_SPEED = 50;

export default {
  INIT_SIZE: 2,
  INIT_SPEED,
  INIT_DIRECTION: DIRECTIONS.UP,

  SPEED_STEP: 3,
  MIN_SPEED: 20,
  DIRECTIONS,

  speed: null,
  direction: null,
  blocks: [],
  frameCount: 0,
};
