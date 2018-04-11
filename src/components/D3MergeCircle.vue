<template>
 
  <div id="d3MergeCircle">
    <D3CirclePacking :titre= "titre" :urlJson = "urlJson" :id="id" />

    <D3BubbleChart :size="33" />
  </div>





  
</template>

<script>

import D3CirclePacking  from './D3CirclePacking.vue';
import D3BubbleChart    from './D3BubbleChart.vue';
import * as debug from 'debug';

const log = debug('d3MergeCircle');



export default {
  name: 'd3MergeCircle',
  components: {
    D3CirclePacking,
    D3BubbleChart
  },
  props: {
      titre: String,
      urlJson: String,
      id: String
  },
  mounted: function () {
    log('mounted');
  }

}
</script>

<style>

  body {
    margin: 0px;
    overflow: hidden;
  }
</style>
