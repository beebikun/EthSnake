<template>
  <div class="container">
    <BgBlock v-for="i in bg" :key="i" />
    <BlockInfo v-for="block in blocks"
               :key="block.id"
               :block="block"
               />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import Component from 'vue-class-component';

import BlockInfo from './BlockInfo.vue';
import BgBlock from './BgBlock.vue';

const BLOCKS_COUNT = 50;

export default
@Component({
  props: {
    eth: Object,
  },
  components: {
    BlockInfo,
    BgBlock,
  },
  computed: mapState(['blocks'])
})
class W3App extends Vue {
  created() {
    window.eth = this.eth;
    this.fetchBlocks();
  }

  bg = Array(8 * 8).fill().map((_, i) => i);

  async fetchBlocks() {
    const latest = await this.eth.getBlockNumber();
    const batch = new this.eth.BatchRequest();
    for (let i = 0; i < BLOCKS_COUNT; i++) {
      const blockNumber = latest - i;
      const getBlock = this.eth.getBlock.request(blockNumber, (_, block) => {
        this.$store.dispatch('addBlock', block);
      });
      batch.add(getBlock);
    }
    batch.execute();
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    width: 512px;
    height: 512px;
    border: 2px solid;
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }
</style>
