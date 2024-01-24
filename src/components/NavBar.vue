<template>
  <nav class="navbar navbar-expand-md" style="background-color: #4a99ce">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#">SECRETARIA</a>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" :class="{ active: $route.path === '/secretaria' }">
            <router-link class="nav-link" to="/secretaria">Inicio</router-link>
          </li>
          <li class="nav-item" :class="{ active: $route.path === '/auditar' }">
            <router-link class="nav-link" to="/auditar">Audiencias</router-link>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input
            class="form-control me-4"
            type="search"
            placeholder="Buscar"
            aria-label="Search"
            v-model="filtroBusqueda"
            @input="realizarBusqueda"
            id="campoBusqueda"
          />
        </form>
        <button class="btn btn-danger" href="javascript:void(0)" @click="handleClick">Salir<svg class="svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#f9f9f9" d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h7v2H5Zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5l-5 5Z"/></svg></button>
      </div>
    </div>
  </nav>
  
  </template>
    
    <script>
  import useAuth from "../composables/useUser";
  import { ref } from 'vue';

  
  export default {
    name: "NavBar",
    methods: {

      tab(){
        const tabEl = document.querySelector('button[data-bs-toggle="tab"]')
tabEl.addEventListener('shown.bs.tab', event => {
  event.target // newly activated tab
  event.relatedTarget // previous active tab
  console.log
})
      },

      handleClick() {
        const { logout } = useAuth();
        logout();
        this.$router.push("/");
      },
  
      realizarBusqueda() {
      this.$emit("buscar", this.filtroBusqueda);
    },
    },
    setup() {
      const { isAuthenticated } = useAuth();
      const filtroBusqueda = ref('');
      return {
        isAuthenticated,
        filtroBusqueda,
      };
    },
  };


  </script>
    
  <style scoped>
  
  .nav-link:hover,
  .nav-item.active .nav-link {
    color: rgb(255, 255, 255); 
    text-shadow: 0px 0px 10px white;
        }
  
  
  </style>
    