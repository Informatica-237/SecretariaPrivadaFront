import { createApp } from 'vue';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import router from './Router';
import App from './App.vue';

const app = createApp(App);

app.use(router);

app.mount('#app');
