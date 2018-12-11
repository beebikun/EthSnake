<template>
  <div class="token"
      :style="tile.style"
      :class="{'pending': isPending}"
      >
    <Robot :block-idx="blockIdx"  />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Robot from './Robot.vue';

export default {
  name: 'Token',
  components: {
    Robot
  },
  props: {
    blockIdx: {
      validator: (value) => isNaN(value) === false,
    },
    idx: String,
  },
  computed: {
    ...mapState({
      tile: function (state) { return state.game.tiles[this.idx]; },
      isPending: function (state) { return state.api.blocks[this.blockIdx].number === null; },
    }),
  },
};

</script>

<style scoped>
  .token {
    position: relative;
    box-sizing: content-box;
    position: absolute;
    z-index: 10;
  }
  .pending {
    background-color: rgba(10, 10, 10, .5);
  }
</style>
