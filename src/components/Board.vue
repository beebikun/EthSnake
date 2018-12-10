<template>
  <div id="container"
       >
    <div id="gameBoard" :style="style">
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

    <CollectedBlocks />

  </div>
</template>

<script>
import { mapState } from 'vuex';

import Token from './Token.vue';
import BgTile from './BgTile.vue';
import Snake from './Snake.vue';
import CollectedBlocks from './CollectedBlocks.vue';

export default {
  name: 'Board',
  components: {
    Token,
    BgTile,
    Snake,
    CollectedBlocks,
  },
  computed: {
    ...mapState({
      tokens: state => state.game.tokens,
      tiles: state => state.game.tiles,
      style: state => {
        const { w, h, side } = state.game.SIZE;
        return {
          width: w * side + 'px',
          height: h * side + 'px',
        };
      },
    })
  }
};

</script>

<style>

  #container {
    padding: 10px;
    padding-left: 20px;
    display: flex;

    background: black;
    color: lawngreen;

    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }

  #gameBoard {
    border: 2px solid yellow;
    position: relative;
  }
</style>
