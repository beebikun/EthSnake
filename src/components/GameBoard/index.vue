<template>
  <div class="game" :style="{ width }">
    <div class="game__board" :style="{ height }">
      <BgTile v-for="tile in tiles"
              :key="tile.id"
              :tile="tile"
              />
      <Token v-for="(blockIdx, idx) in tokens"
             :key="idx"
             :idx="idx"
             :block-idx="blockIdx"
             />
      <Snake />

      <PauseScreen v-if="showPuase" />
    </div>

    <div class="game__info" >
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

  </div>
</template>

<script>

import { mapState } from 'vuex';

import BgTile from './BgTile.vue';
import Token from './Token.vue';
import Snake from './Snake.vue';
import PauseScreen from './PauseScreen.vue';

export default {
  name: 'GameBoard',
  components: {
    BgTile,
    Token,
    Snake,
    PauseScreen,
  },
  computed: {
    ...mapState({
      tokens: state => state.game.tokens,
      tiles: state => state.game.tiles,
      showPuase: state => state.game.STATE != state.game.STATES.RUN,
      width: state => state.game.SIZE.side * state.game.SIZE.w + 'px',
      height: state => state.game.SIZE.side * state.game.SIZE.h + 'px',
    }),
  }
};

</script>

<style scoped >
  .game__board {
    border: 2px solid yellow;
    position: relative;
    width: 100%;
  }

  .game__info {
    margin-top: 25px;
    font-size: 25px;
  }

  .game__info p {
    margin: 0 5px;
  }
</style>
