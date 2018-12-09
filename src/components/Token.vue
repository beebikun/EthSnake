<template>
  <div class="block"
      :style="tile.style"
      :class="{'pending': isPending}"
      >
    <div class="bg" :style="{'background-image': avatar}" />
    <!-- <div class="name">{{ decode(block.extraData) }}</div> -->
  </div>
<!--   <ul class="box-card">
    <li>{{ block.difficulty }} / {{ block.totalDifficulty }}</li>
    <li><strong>extraData:</strong> {{ decode(block.extraData) }} </li>
    <li><strong>stateRoot:</strong> {{ decode(block.stateRoot) }} </li>
    <li><strong>miner:</strong> {{ decode(block.miner) }} </li>
    <li>
      {{ block.size }}
    </li>
    <li>
      {{ block.gasLimit }} / {{ block.gasUsed }}
    </li>
  </ul> -->
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Token',
  props: {
    blockIdx: String,
    idx: String,
  },
  computed: {
    ...mapState({
      tile: function (state) { return state.game.tiles[this.idx]; },
      block: function (state) { return state.api.blocks[this.blockIdx]; },
    }),
    avatar: function () { return `url(https://robohash.org/${ this.block.miner })` },
    isPending: function () { return this.block.number === null; },
  },
};

</script>

<style scoped>
  .block {
    position: relative;
    box-sizing: content-box;
    position: absolute;
    z-index: 10;
  }
  .block .bg {
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    left: 3px;
    right: 3px;
    top: 3px;
    bottom: 3px;
  }
  .pending {
    background-color: gray;
  }
</style>
