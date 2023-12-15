<template>
  <div>
    <!-- Buttons to switch datasets -->
    <Button label="Produse" @click="setCurrentTable('produse')" />
    <Button label="Persoane" @click="setCurrentTable('persoane')" />
    <Button label="Masini" @click="setCurrentTable('masini')" />

    <!-- DataTable for displaying data -->
    <DataTable
      :value="currentData"
      class="p-datatable-gridlines p-datatable-sm"
    >
      <Column
        v-for="col in currentColumns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      ></Column>
      <Column header="Acțiuni">
        <template #body="slotProps">
          <Menu :model="actionsMenu" popup ref="menu" />
          <Button
            icon="pi pi-ellipsis-v"
            @click="showMenu($event, slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            @click="confirmDelete(slotProps.data)"
            class="p-button-rounded p-button-warning"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
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
        produse: {
          data: [
            { id: 1, denumire: "Laptop", stoc: 10, pret: 1500 },
            { id: 2, denumire: "Smartphone", stoc: 15, pret: 800 },
            { id: 3, denumire: "Tabletă", stoc: 8, pret: 600 },
            { id: 4, denumire: "Casti Wireless", stoc: 20, pret: 200 },
            { id: 5, denumire: "Mouse Wireless", stoc: 25, pret: 50 },
            { id: 6, denumire: "Tastatură Mecanică", stoc: 5, pret: 300 },
            { id: 7, denumire: "Monitor LED", stoc: 10, pret: 400 },
            { id: 8, denumire: "Camera Web", stoc: 12, pret: 150 },
            { id: 9, denumire: "Hard Disk Extern", stoc: 8, pret: 500 },
            { id: 10, denumire: "Router Wireless", stoc: 6, pret: 250 },
          ],
          columns: [
            { field: "id", header: "ID" },
            { field: "denumire", header: "Denumire" },
            { field: "stoc", header: "Stoc" },
            { field: "pret", header: "Pret" },
          ],
        },
        persoane: {
          data: [
            {
              id: 1,
              nume: "Popescu",
              prenume: "Ion",
              adresa: "Strada Libertății 1",
              email: "ion.popescu@example.com",
            },
            {
              id: 2,
              nume: "Ionescu",
              prenume: "Ana",
              adresa: "Strada Revoluției 2",
              email: "ana.ionescu@example.com",
            },
            {
              id: 3,
              nume: "Dumitru",
              prenume: "Mihai",
              adresa: "Strada Unirii 3",
              email: "mihai.dumitru@example.com",
            },
            {
              id: 4,
              nume: "Nistor",
              prenume: "Elena",
              adresa: "Strada Aviatorilor 4",
              email: "elena.nistor@example.com",
            },
            {
              id: 5,
              nume: "Vasile",
              prenume: "Andrei",
              adresa: "Strada Castanilor 5",
              email: "andrei.vasile@example.com",
            },
            {
              id: 6,
              nume: "Mocanu",
              prenume: "Larisa",
              adresa: "Strada Florilor 6",
              email: "larisa.mocanu@example.com",
            },
            {
              id: 7,
              nume: "Petrescu",
              prenume: "Bogdan",
              adresa: "Strada Mărășești 7",
              email: "bogdan.petrescu@example.com",
            },
            {
              id: 8,
              nume: "Stan",
              prenume: "Ioana",
              adresa: "Strada Plopilor 8",
              email: "ioana.stan@example.com",
            },
            {
              id: 9,
              nume: "Dobre",
              prenume: "Alexandru",
              adresa: "Strada Eroilor 9",
              email: "alexandru.dobre@example.com",
            },
            {
              id: 10,
              nume: "Marin",
              prenume: "Diana",
              adresa: "Strada Primăverii 10",
              email: "diana.marin@example.com",
            },
          ],
          // ... more people

          columns: [
            { field: "id", header: "ID" },
            { field: "nume", header: "Nume" },
            { field: "prenume", header: "Prenume" },
            { field: "adresa", header: "Adresa" },
            { field: "email", header: "Email" },
          ],
        },
        masini: {
          data: [
            { id: 1, marca: "Audi", model: "A4", an: 2020, motor: "2.0 TDI" },
            {
              id: 2,
              marca: "BMW",
              model: "320",
              an: 2021,
              motor: "2.0 Diesel",
            },
            {
              id: 3,
              marca: "Mercedes",
              model: "C200",
              an: 2019,
              motor: "1.8 Petrol",
            },
            {
              id: 4,
              marca: "Tesla",
              model: "Model 3",
              an: 2022,
              motor: "Electric",
            },
            {
              id: 5,
              marca: "Volvo",
              model: "XC60",
              an: 2018,
              motor: "2.0 Diesel",
            },
            {
              id: 6,
              marca: "Ford",
              model: "Focus",
              an: 2017,
              motor: "1.5 Diesel",
            },
            {
              id: 7,
              marca: "Toyota",
              model: "Corolla",
              an: 2020,
              motor: "1.8 Hybrid",
            },
            {
              id: 8,
              marca: "Honda",
              model: "Civic",
              an: 2016,
              motor: "2.0 Petrol",
            },
            {
              id: 9,
              marca: "Nissan",
              model: "Qashqai",
              an: 2021,
              motor: "1.3 Petrol",
            },
            {
              id: 10,
              marca: "Peugeot",
              model: "508",
              an: 2019,
              motor: "2.0 Diesel",
            },
          ],
          columns: [
            { field: "id", header: "ID" },
            { field: "marca", header: "Marca" },
            { field: "model", header: "Model" },
            { field: "an", header: "An" },
            { field: "motor", header: "Motor" },
          ],
        },
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
    },
  },
};
</script>

<!-- Add your existing styles here -->
