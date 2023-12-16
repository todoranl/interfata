<template>
    <div>
      <!-- Button to open the add car form -->
      <Button label="Adaugă Mașină" @click="showAddCarDialog = true" />
      
      <!-- Dialog for the add car form -->
      <Dialog v-model:visible="showAddCarDialog" modal>
        <form @submit.prevent="addMasina">
          <InputText v-model="newCar.marca" placeholder="Marca" />
          <InputText v-model="newCar.model" placeholder="Model" />
          <InputNumber v-model="newCar.an" placeholder="An" />
          <InputNumber v-model="newCar.motor" placeholder="Motor" />
          <Button label="Adaugă" type="submit" />
        </form>
      </Dialog>
      <Dialog v-model:visible="showEditForm" modal>
    <form @submit.prevent="submitEdit">
      <InputText v-model="currentEditCar.marca" placeholder="Marca" />
      <InputText v-model="currentEditCar.model" placeholder="Model" />
      <InputNumber v-model="currentEditCar.an" placeholder="An" />
      <InputText v-model="currentEditCar.motor" placeholder="Motor" />
      <Button label="Modifica" type="submit" />
    </form>
  </Dialog>
  
      <!-- DataTable for displaying cars -->
      <DataTable :value="masini" class="p-datatable-gridlines">
        <Column field="id" header="ID"></Column>
  <Column field="marca" header="Marca"></Column>
  <Column field="model" header="Model"></Column>
  <Column field="an" header="An"></Column>
  <Column field="motor" header="Motor"></Column>
  <Column header="Acțiuni" :key="car => car.id">
    <template #body="slotProps">
      <Button icon="pi pi-pencil" @click="openEditForm(slotProps.data)" class="p-button-text" />
      <Button icon="pi pi-trash" @click="() => deleteMasina(slotProps.data.id)" class="p-button-text" />
    </template>
  </Column>
      </DataTable>
    </div>
  </template>
  
  <script>

  // import Menu from 'primevue/menu';
  import axios from 'axios';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Button from 'primevue/button';
  import Dialog from 'primevue/dialog';
  import InputText from 'primevue/inputtext';
  import InputNumber from 'primevue/inputnumber';
  
  export default {
    components: {
        // Menu,
      DataTable,
      Column,
      Button,
      Dialog,
      InputText,
      InputNumber
      
    },
    data() {
      return {
        currentEditCar: {},
    showEditForm: false,
        masini: [],
        showAddCarDialog: false,
        newCar: {
          marca: '',
          model: '',
          an: null
        }
      };
    },
    mounted() {
      this.fetchMasini();
    },
    methods: {
        submitEdit() {
    axios.put(`https://localhost:7084/masina/${this.currentEditCar.id}`, this.currentEditCar)
      .then(() => {
        this.showEditForm = false;
        this.fetchMasini(); // Refresh the list of cars
      })
      .catch(error => {
        console.error("Error updating car:", error);
      });
  },
      fetchMasini() {
        axios.get('https://localhost:7084/masina')
          .then(response => {
            this.masini = response.data;
          })
          .catch(error => {
            console.error("There was an error fetching the data:", error);
          });
      },
      addMasina() {
        axios.post('https://localhost:7084/masina', this.newCar)
          .then(() => {
            this.showAddCarDialog = false;
            this.fetchMasini(); // Refresh the list
          })
          .catch(error => {
            console.error("Error adding car:", error);
          });
      },

      getActionsMenu(car) {
      return [
        {
          label: 'Modifica',
          icon: 'pi pi-pencil',
          command: () => {
            this.openEditForm(car);
          }
        },
        {
          label: 'Sterge',
          icon: 'pi pi-trash',
          command: () => {
            this.deleteMasina(car.id);
          }
        }
      ];
    },
    openEditForm(car) {
        // Set the current car to be edited
    this.currentEditCar = { ...car };
    // Toggle the visibility of the edit form
    this.showEditForm = true;
      // Logic to open the edit form
    },
    deleteMasina(id) {

        if (confirm('Are you sure you want to delete this car?')) {
      axios.delete(`https://localhost:7084/masina/${id}`)
        .then(() => {
          // Refresh the list of cars
          this.fetchMasini();
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
  