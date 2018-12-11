<template>
  <div id="gameInfo" :style="style" >
    <p>
      Collect all blocks
    </p>
    <p>
      Use arrows ← ↑ → ↓ to control the snake
    </p>
    <p>
      Press SPACE to PAUSE
    </p>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'GameInfo',
  computed: {
    ...mapState({
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
