<template>
  <div class="snake-block" :style="tile.style" :class="{'head': isHead}">
    {{ this.id }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SnakeBlock',
  props: {
    idx: String,
    id: String,
  },
  computed: {
    ...mapState({
      tile: function (state) { return state.game.tiles[this.idx]; }
    }),
    isHead: function () {
      return this.id === 'snake:0';
    }
  },
};

</script>

<style scoped>
  .snake-block {
    position: absolute;
    background: rgba(255, 255, 0, 0.6);
  }
  .head {
    border: 2px solid red;
    box-sizing: border-box;
  }

</style>
