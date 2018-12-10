import Vue from 'vue';

export default {
  setSnake(state, blocks) {
    Vue.set(state, 'blocks', blocks);
  },

  addFrameCount(state) {
    state.frameCount += 1;
  },
  flushFrameCount(state) {
    state.frameCount = 0;
  },

  setDirection(state, name) {
    const direction = state.DIRECTIONS[name];
    if (direction) {
      state.direction = direction;
    }
  },

  speedup(state) {
    const newSpeed = state.SPEED - state.SPEED_STEP;
    state.SPEED = Math.max(newSpeed, state.MIN_SPEED);
  }
};
