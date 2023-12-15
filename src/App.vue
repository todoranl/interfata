<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <MasiniTable msg="List of Products" />
  </div>
</template>

<script>
import MasiniTable from "./components/MasiniTable.vue";

export default {
  name: "App",
  components: {
    MasiniTable, // Registering the MasiniTable component
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
