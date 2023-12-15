import { DataTable } from 'primevue/datatable';

<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <ProductsTable msg="List of Products" />
  </div>
</template>

<script>
import ProductsTable from "./components/TableComponent.vue";

export default {
  name: "App",
  components: {
    ProductsTable, // Folosim noua noastră componentă de tabel aici
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
