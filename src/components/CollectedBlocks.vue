<template>
  <div id="collected"
       >
    <h1 class="header"> Collected blocks: </h1>

    <div v-for="block in blocks"
         :key="block.id"
         class="collected-blocks"
         >
      <div class="collected-blocks__robot" >
        <Robot :block-idx="block.idx" />
      </div>

      <StatsList
        :src="block"
        :items="statsItems(block)"
        :is-block-stats="true"
        />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Robot from './GameBoard/Robot.vue';
import StatsList from './StatsList.vue';

export default {
  name: 'CollectedBlocks',
  components: {
    StatsList,
    Robot,
  },
  computed: {
    ...mapGetters({ blocks: 'getCollected' }),
  },
  methods: {
    statsItems: function (block) {
      const dt = new Date(block.timestamp * 1000);
      const date = `${ dt.getDate() }/${ dt.getMonth() + 1 }`;
      const time = `${dt.getHours()}:${ dt.getMinutes() }:${ dt.getSeconds() }`;
      const timestamp = `${ date } ${ time }`;

      return [
        { key: 'timestamp', title: 'Time', value: timestamp },
        { key: 'difficulty', title: 'Difficulty' },
        { key: 'totalDifficulty', title: 'Total Difficulty' },
        { key: 'size', title: 'Size' },
        { key: 'gasLimit', title: 'Gas Limit' },
        { key: 'gasUsed', title: 'Gas Used' },
        { key: 'transactions', title: 'Transactions',
          value: block.transactions.length,
          transactionsToggleIdx: block.idx },
      ];
    },
  },
};

</script>

<style scoped>
  #collected {
    padding: 0 20px;
    max-height: 100%;
    overflow: scroll;
    flex: 1 0 auto;
  }

  .collected-blocks {
    display: flex;
    margin-bottom: 10px;
  }

  .collected-blocks__robot {
    position: relative;
    width: 64px;
    height: 64px;
  }

  .header {
    color: lawngreen;
    width: 100%;
    padding: 5px 0;
    margin: 0;
  }
</style>
