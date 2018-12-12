<template>
  <dl class="block-info">
    <template v-for="item in infoBlocks">
      <dt :key="'dt' + item.key">
        {{ item.title }}:
        <ToggleShowTransactionsButton
              v-if="item.transactionsToggleIdx"
              :block-idx="item.transactionsToggleIdx" />
      </dt>
      <dd :key="'dd' + item.key">
        <div class="stats"
             v-if="item.isStat"
             :style="item.width"> </div>
        <span class="info">{{ item.value }}</span>
      </dd>
    </template>
  </dl>
</template>

<script>
import { mapState } from 'vuex';
import ToggleShowTransactionsButton from './ToggleShowTransactionsButton.vue';

export default {
  name: 'StatsList',
  props: {
    items: Array,
    isBlockStats: Boolean,
    src: Object,
  },
  components: {
    ToggleShowTransactionsButton
  },
  methods: {
    isStat(key) {
      return this.stats[key] !== undefined;
    },
    barWidth(key, value) {
      const { min, max } = this.stats[key];
      const d = max - min;
      const percentage = ( value - min ) * 100 / d;
      return {
        width: percentage.toFixed(1) + '%',
      }
    },
  },
  computed: {
    ...mapState({
      stats: function (state) {
        return this.isBlockStats ? state.api.blocksStats : state.api.transStats ;
      },
    }),
    infoBlocks: function() {
      return this.items.map(({ key, value, title, transactionsToggleIdx }) => {
        const isStat = this.isStat(key);
        const srcValue = isNaN(this.src[key]) ? value : this.src[key];
        const width = isStat ? this.barWidth(key, srcValue || value) : '';

        return {
          key, title, isStat, width, transactionsToggleIdx,
          value: isStat ? srcValue : ( value || srcValue ),
        };
      });
    }
  },
};

</script>

<style scoped>
  .block-info {
    margin: 0;
    border-bottom: 1px solid;
    padding-bottom: 7px;
    margin-left: 7px;
    width: 100%;
    max-width: 200px;
  }

  dd {
    position: relative;
  }

  .info {
    position: relative;
    z-index: 10;
  }

  .stats {
    position: absolute;
    left: 0;
    height: 100%;
    top: 0;
    background: darkslategray;
    min-width: 4px;
  }
</style>
