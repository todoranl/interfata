import { createApp } from "vue";
import App from "./App.vue"; // Adjust the path if your App.vue is in a different directory
import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css"; // theme
import "primevue/resources/primevue.min.css"; // core css
import "primeicons/primeicons.css"; // icons
import axios from 'axios';
import ConfirmDialog from 'primevue/confirmdialog';

axios.defaults.baseURL = 'http://localhost:7084';

const app = createApp(App);
app.use(PrimeVue);
app.component('ConfirmDialog', ConfirmDialog);
app.mount("#app");
