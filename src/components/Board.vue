<template>
  <div class="container" :style="style">
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
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Token from './Token.vue';
import BgTile from './BgTile.vue';
import Snake from './Snake.vue';

export default {
  name: 'Board',
  components: {
    Token,
    BgTile,
    Snake,
  },
  computed: mapState({
    tokens: state => state.game.tokens,
    tiles: state => state.game.tiles,
    style: state => {
      const { w, h, side } = state.game.SIZE;
      return {
        width: w * side + 'px',
        height: h * side + 'px',
      };
    },
  }),
  created: function () {
    // console.log(this);
  }
};

</script>

<style scoped>
  .container {
    border: 2px solid;
    position: relative;
  }
</style>
