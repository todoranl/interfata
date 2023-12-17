<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <ProduseTable msg="List of Products" />
  </div>
</template>

<script>
//import PersoaneTable from "./components/PersoaneTable.vue";
//import MasiniTable from "./components/PersoaneTable.vue";
import ProduseTable from "./components/ProduseTable.vue";

export default {
  name: "App",
  components: {
    //MasiniTable,
    //PersoaneTable,
    ProduseTable

},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
