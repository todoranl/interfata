<template>
    <div>
      <!-- Button to open the add person form -->
      <Button label="Adaugă Produs" @click="openAddProdusDialog" />
  
      <!-- Dialog for the add person form -->
      <Dialog v-model:visible="showAddProdusDialog" modal>
        <form @submit.prevent="addProdus"> 
          <InputText v-model="newProdus.denumire" placeholder="Denumire" />
          <InputText v-model="newProdus.stoc" placeholder="Stoc" />
          <InputText v-model="newProdus.pret" placeholder="Pret" />
          <Button label="Adaugă" type="submit" />
        </form>
      </Dialog>
  
      <Dialog v-model:visible="showEditForm" modal>
        <form @submit.prevent="submitEdit">
          <InputText v-model="currentEditProdus.id" placeholder="Id" />
          <InputText v-model="currentEditProdus.denumire" placeholder="Denumire" />
          <InputText v-model="currentEditProdus.stoc" placeholder="Stoc" />
          <InputText v-model="currentEditProdus.pret" placeholder="Pret" />
          <Button label="Modifica" type="submit" />
        </form>
      </Dialog>
  
      <!-- DataTable for displaying people -->
      <DataTable :value="produse" class="p-datatable-gridlines">

        <Column field="id" header="Id"></Column>
        <Column field="denumire" header="Denumire"></Column>
        <Column field="stoc" header="Stoc"></Column>
        <Column field="pret" header="Pret"></Column>
        <Column header="Acțiuni">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" @click="openEditForm(slotProps.data)" class="p-button-text" />
            <Button icon="pi pi-trash" @click="() => deleteProdus(slotProps.data.id)" class="p-button-text" />
          </template>
        </Column>
      </DataTable>
    </div>
  </template>
  <script>
  import axios from 'axios';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Button from 'primevue/button';
  import Dialog from 'primevue/dialog';
  import InputText from 'primevue/inputtext';
  
  export default {
    components: {
      DataTable,
      Column,
      Button,
      Dialog,
      InputText
    },
    data() {
      return {
        currentEditProdus: {},
        showEditForm: false,
        produse: [], // Updated name to 'produse'
        showAddProdusDialog: false,
        newProdus: {
       
          denumire: '',
          stoc: '',
          pret: ''
        }
      };
    },
    mounted() {
      this.fetchProdus();
    },
 
  
  methods: {
    fetchProdus() {
  axios.get('https://localhost:7084/produs')
    .then(response => {
      console.log(response.data); // Afișați datele în consolă pentru a le verifica
      this.produse = response.data;
    })
    .catch(error => {
      console.error("There was an error fetching the data:", error);
    });
},
    submitEdit() {
      axios.put(`https://localhost:7084/produs/${this.currentEditProdus.id}`, this.currentEditProdus)
        .then(() => {
          this.showEditForm = false;
          this.fetchProdus();
        })
        .catch(error => {
          console.error("Error updating produs:", error);
        });
    },
    openAddProdusDialog() {
    // Resetare newProdus la valori implicite
    this.newProdus = {
      denumire: '',
      stoc: '',
      pret: ''
    };
    // Deschide dialogul de adăugare a produsului
    this.showAddProdusDialog = true;
  },
    addProdus() {
  console.log("Adding produs:", this.newProdus);
  axios.post('https://localhost:7084/produs', this.newProdus, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(() => {
    this.showAddProdusDialog = false;
    this.fetchProdus();
  })
  .catch(error => {
    console.error("Error adding produs:", error.response);
  });
},

    
    getActionsMenu(produs) {
      return [
        {
          label: 'Modifica',
          icon: 'pi pi-pencil',
          command: () => {
            this.openEditForm(produs);
          }
        },
        {
          label: 'Sterge',
          icon: 'pi pi-trash',
          command: () => {
            this.deleteProdus(produs.id);
          }
        }
      ];
    },
    openEditForm(produs) {
        // Set the current car to be edited
    this.currentEditProdus = { ...produs };
    // Toggle the visibility of the edit form
    this.showEditForm = true;
      // Logic to open the edit form
    },
    deleteProdus(id) {

        if (confirm('Are you sure you want to delete this car?')) {
      axios.delete(`https://localhost:7084/produs/${id}`)
        .then(() => {
          // Refresh the list of cars
          this.fetchProdus();
        })
        .catch(error => {
          console.error("Error deleting car:", error);
        });
    }
      // Logic to delete the car
    },
      // ... existing methods ...
    }
  };
  </script>
  