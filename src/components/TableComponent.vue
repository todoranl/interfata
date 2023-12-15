<template>
  <div>
    <!-- Buttons to switch datasets -->
    <Button label="Produse" @click="setCurrentTable('produse')" />
    <Button label="Persoane" @click="setCurrentTable('persoane')" />
    <Button label="Masini" @click="setCurrentTable('masini')" />

    <!-- DataTable for displaying data -->
    <DataTable :value="currentData" class="p-datatable-gridlines p-datatable-sm">
      <Column v-for="col in currentColumns" :key="col.field" :field="col.field" :header="col.header" />
      <Column header="Acțiuni">
        <template #body>
          <!-- Your menu and buttons here -->
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import axios from 'axios';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

export default {
  components: {
    DataTable,
    Column,
    Button,
  },
  data() {
    return {
      currentTable: "produse",
      tables: {
        produse: { data: [], columns: [ /* ... */ ] },
        persoane: { data: [], columns: [ /* ... */ ] },
        masini: { data: [], columns: [ /* ... */ ] },
      },
      apiEndpoints: {
        produse: 'https://localhost:7084/produs',
        persoane: 'https://localhost:7084/persoana',
        masini: 'https://localhost:7084/masina',
      },
    };
  },
  computed: {
    currentData() {
      return this.tables[this.currentTable].data;
    },
    currentColumns() {
      return this.tables[this.currentTable].columns;
    },
  },
  methods: {
    setCurrentTable(table) {
      this.currentTable = table;
      this.fetchData(table);
    },
    fetchData(table) {
      const endpoint = this.apiEndpoints[table];
      axios.get(endpoint)
        .then(response => {
          this.tables[table].data = response.data;
        })
        .catch(error => {
          console.error("Error loading data: ", error);
        });
    },
  },
  mounted() {
    this.fetchData(this.currentTable);
  }
};
</script>
