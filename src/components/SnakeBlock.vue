<template>
  <div class="snake-block" :style="tile.style">
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
  },
};

</script>

<style scoped>
  .snake-block {
    position: absolute;
    background: yellow;
  }

</style>
