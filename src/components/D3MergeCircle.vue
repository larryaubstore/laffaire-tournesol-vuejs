<template>
 
  <div id="d3MergeCircle">
    <!-- <D3CirclePacking :titre= "titre" :urlJson = "urlJson" :id="id" /> -->

    <D3BubbleChart :urlJson = "urlJson" :disableClick =  "true" />
    <!-- <About hideBackground="true" /> -->
  </div>





  
</template>

<script>

import D3CirclePacking  from './D3CirclePacking.vue';
import D3BubbleChart    from './D3BubbleChart.vue';
import About            from './About.vue';
import * as debug from 'debug';

const log = debug('d3MergeCircle');



export default {
  name: 'd3MergeCircle',
  components: {
    D3CirclePacking,
    D3BubbleChart,
    About
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
