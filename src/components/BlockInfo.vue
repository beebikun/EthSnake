<template>
  <div class="block" :style="{backgroundImage: avatar}" :class="{'pending': !block.number}">
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
import Vue from 'vue';
import Component from 'vue-class-component';

export default
@Component({
  props: {
    block: Object,
  },
})
class BlockInfo extends Vue {
  decode(s) {
    if (typeof s !== 'string') return s;
    return web3.toAscii(s);
  }

  get avatar() {
    return `url(https://robohash.org/${ this.block.miner })`;
  }
  // async fetchBlocks() {
  //   const latest = await this.eth.getBlockNumber();
  //   const batch = new this.eth.BatchRequest();
  //   for (let i = 0; i < BLOCKS_COUNT; i++) {
  //     const blockNumber = latest - i;
  //     const getBlock = this.eth.getBlock.request(blockNumber, (_, block) => {
  //       block.id = block.number || `pending_${ block.timestamp }`
  //       this.blocks.push(block);
  //       // console.log(block);
  //     });
  //     batch.add(getBlock);
  //   }
  //   batch.execute();
  // }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .block {
    width: 64px;
    height: 64px;
    position: relative;
    background-size: cover;
    box-sizing: content-box;
    background-repeat: no-repeat;
    position: relative;
    z-index: 10;
  }
  .pending {
    background-color: gray;
  }
</style>
