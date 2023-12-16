<template>
    <div>
      <!-- Button to open the add person form -->
      <Button label="Adaugă Persoană" @click="showAddPersoanaDialog = true" />
  
      <!-- Dialog for the add person form -->
      <Dialog v-model:visible="showAddPersoanaDialog" modal>
        <form @submit.prevent="addPersoana">
          <InputText v-model="newPersoana.nume" placeholder="Nume" />
          <InputText v-model="newPersoana.prenume" placeholder="Prenume" />
          <InputText v-model="newPersoana.adresa" placeholder="Adresa" />
          <InputText v-model="newPersoana.email" placeholder="Email" />
          <Button label="Adaugă" type="submit" />
        </form>
      </Dialog>
  
      <Dialog v-model:visible="showEditForm" modal>
        <form @submit.prevent="submitEdit">
          <InputText v-model="currentEditPersoana.nume" placeholder="Nume" />
          <InputText v-model="currentEditPersoana.prenume" placeholder="Prenume" />
          <InputText v-model="currentEditPersoana.adresa" placeholder="Adresa" />
          <InputText v-model="currentEditPersoana.email" placeholder="Email" />
          <Button label="Modifica" type="submit" />
        </form>
      </Dialog>
  
      <!-- DataTable for displaying people -->
      <DataTable :value="persoane" class="p-datatable-gridlines">
        <Column field="id" header="ID"></Column>
        <Column field="nume" header="Nume"></Column>
        <Column field="prenume" header="Prenume"></Column>
        <Column field="adresa" header="Adresa"></Column>
        <Column field="email" header="Email"></Column>
        <Column header="Acțiuni">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" @click="openEditForm(slotProps.data)" class="p-button-text" />
            <Button icon="pi pi-trash" @click="() => deletePersoana(slotProps.data.id)" class="p-button-text" />
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
      currentEditPersoana: {},
      showEditForm: false,
      persoane: [],
      showAddPersoanaDialog: false,
      newPersoana: {
        nume: '',
        prenume: '',
        adresa: '',
        email: ''
      }
    };
  },
  mounted() {
    this.fetchPersoane();
  },
  methods: {
    submitEdit() {
      axios.put(`https://localhost:7084/persoana/${this.currentEditPersoana.id}`, this.currentEditPersoana)
        .then(() => {
          this.showEditForm = false;
          this.fetchPersoane();
        })
        .catch(error => {
          console.error("Error updating person:", error);
        });
    },
    fetchPersoane() {
      axios.get('https://localhost:7084/persoana')
        .then(response => {
          this.persoane = response.data;
        })
        .catch(error => {
          console.error("There was an error fetching the data:", error);
        });
    },
    addPersoana() {
      axios.post('https://localhost:7084/persoana', this.newPersoana)
        .then(() => {
          this.showAddPersoanaDialog = false;
          this.fetchPersoane();
        })
        .catch(error => {
          console.error("Error adding person:", error);
        });
    },
    
    getActionsMenu(persoana) {
      return [
        {
          label: 'Modifica',
          icon: 'pi pi-pencil',
          command: () => {
            this.openEditForm(persoana);
          }
        },
        {
          label: 'Sterge',
          icon: 'pi pi-trash',
          command: () => {
            this.deleteMasina(persoana.id);
          }
        }
      ];
    },
    openEditForm(persoana) {
        // Set the current car to be edited
    this.currentEditPersoana = { ...persoana };
    // Toggle the visibility of the edit form
    this.showEditForm = true;
      // Logic to open the edit form
    },
    deletePersoana(id) {

        if (confirm('Are you sure you want to delete this car?')) {
      axios.delete(`https://localhost:7084/persoana/${id}`)
        .then(() => {
          // Refresh the list of cars
          this.fetchPersoane();
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
  