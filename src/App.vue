<template>
 
  <div id="root2">
    <D3Circular msg="Welcome to Your Vue.js App" :titre= "titre" :urlJson = "urlJson" :id="id" />
  </div>


  
</template>

<script>
import D3Circular from './components/D3Circular.vue';



export default {
  name: 'app',
  components: {
    D3Circular
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
