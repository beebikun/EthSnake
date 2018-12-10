<template>
  <div class="snake-block" :style="tile.style" :class="{'head': isHead}">
    <!-- {{ this.id }} -->
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
    background: rgba(94, 131, 222, 0.8);
    border: 3px solid #0043ff;
    box-sizing: border-box;
  }
  .head {
    background: rgba(20, 22, 173, 0.8);
    border: 3px solid #0043ff;
  }

</style>
