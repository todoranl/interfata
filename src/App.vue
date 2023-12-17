<template>
  
    <div>
      
      <div class="buton-container">
    <Button label="Încarcă Mașini" @click="loadMasini" />
    <Button label="Încarcă Produse" @click="loadProduse" />
    <Button label="Încarcă Persoane" @click="loadPersoane" />
  </div>

    <div class="tabel-container">
      <MasiniTable v-if="currentTable === 'masini'" :data="masiniData" />
      <ProduseTable v-if="currentTable === 'produse'" :data="produseData" />
      <PersoaneTable v-if="currentTable === 'persoane'" :data="persoaneData" />
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';
import MasiniTable from './components/MasiniTable.vue';
import ProduseTable from './components/ProduseTable.vue';
import PersoaneTable from './components/PersoaneTable.vue';

export default {
  name: "App",
  components: {
    Button,
    MasiniTable,
    ProduseTable,
    PersoaneTable
  },
  data() {
    return {
      
      currentTable: null,
      masiniData: [],
      produseData: [],
      persoaneData: []
    };
  },
  methods: {
  loadMasini() {
    // Actualizați pentru a seta tabelul curent pe 'masini'
    this.currentTable = 'masini';
    // Adăugați aici logica pentru a încărca datele mașinilor, dacă este necesar
  },
  loadProduse() {
    // Actualizați pentru a seta tabelul curent pe 'produse'
    this.currentTable = 'produse';
    // Adăugați aici logica pentru a încărca datele produselor, dacă este necesar
  },
  loadPersoane() {
    // Actualizați pentru a seta tabelul curent pe 'persoane'
    this.currentTable = 'persoane';
    // Adăugați aici logica pentru a încărca datele persoanelor, dacă este necesar
  }
}

};
</script>


<style>
#app {
  .buton-container {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #f0f0f0;
  padding: 20px;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
.buton-container .p-button {
  margin-right: 20px; /* Adaugă spațiu la dreapta fiecărui buton */
}

.buton-container .p-button:last-child {
  margin-right: 0; /* Elimină spațiul suplimentar de la ultimul buton */
}
.tabel-container {
  margin-top: 200px; /* Ajustați această valoare în funcție de înălțimea buton-container */
}
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
