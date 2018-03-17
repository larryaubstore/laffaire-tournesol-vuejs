<template>
 
  <div id="root2">
    <D3CirclePacking :titre= "titre" :urlJson = "urlJson" :id="id" />

    <D3BubbleChart :size="33" />
  </div>


  
</template>

<script>
import D3CirclePacking from './components/D3CirclePacking.vue';
import D3BubbleChart  from './components/D3BubbleChart.vue';



export default {
  name: 'app',
  components: {
    D3CirclePacking,
    D3BubbleChart
  },
  props: {
      titre: String,
      urlJson: String,
      id: String

  }

}
</script>

<style>

  body {
    margin: 0px;
    overflow: hidden;
  }
</style>
