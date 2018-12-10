<template>
<dl class="block-info">
	<dt>Time:</dt>
	 	<dd>{{ timestamp }}</dd>
	<dt>Extra data:</dt>
	 	<dd>{{ decode(block.extraData) }}</dd>
  	<dt>Miner:</dt>
	 	<dd>{{decode(block.miner) }}</dd>
 	<dt>Difficulty:</dt>
	 	<dd>{{ block.difficulty }}</dd>
  	<dt>Total Difficulty:</dt>
	 	<dd>{{ block.totalDifficulty }}</dd>
	<dt>Size:</dt>
	 	<dd>{{ block.size }}</dd>
	<dt>Gas Limit:</dt>
	 	<dd>{{ block.gasLimit }}</dd>
	<dt>Gas Used:</dt>
	 	<dd>{{ block.gasUsed }}</dd>
</dl>
</template>

<script>

export default {
  name: 'BlockInfo',
  props: {
  	block: Object
  },
  methods: {
  	decode(value) {
  		return web3.toAscii(value);
  	}
  },
  computed: {
  	timestamp: function () {
  		const dt = new Date(this.block.timestamp * 1000);
  		const date = `${ dt.getDate() }/${ dt.getMonth() + 1 }`;
  		const time = `${dt.getHours()}:${ dt.getMinutes() }:${ dt.getSeconds() }`;
  		return `${ date } ${ time }`;
  	}
  }
};

</script>

<style scoped>
  .block-info {
  	margin: 0;
    border-bottom: 1px solid;
    padding-bottom: 7px;
    margin-left: 7px;
  }
</style>
