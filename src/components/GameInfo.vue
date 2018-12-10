<template>
  <div id="gameInfo" :style="style" >
    <p>
      Collect all blocks
    </p>
    <p>
      Use arrows ← ↑ → ↓ to control the snake
    </p>
    <p>
      Press SPACE to {{ nextGameState }} the game
    </p>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'GameInfo',
  computed: {
    ...mapState({
      nextGameState: (state) => {
        switch(state.game.STATE) {
          case state.game.STATES.RUN:
            return 'PAUSE';
          case state.game.STATES.PAUSE:
            return 'RESUME';
          default:
            return 'RUN';
        }
      },
      style: (state) => {
        const { h, side } = state.game.SIZE;
        return {
          top: h * side + 'px',
        };
      }
    }),
  }
};

</script>

<style>
  #gameInfo {
    margin-top: 25px;
    font-size: 25px;
    position: absolute;
  }

  #gameInfo h2 {
    margin: 0;
  }

  #gameInfo p {
    margin: 0 5px;
  }

</style>
