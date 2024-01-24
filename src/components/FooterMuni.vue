<!-- Footer.vue -->
<template>
    <v-footer class="d-flex flex-column footer">
      <div class="px-4 py-2 bg-grey-darken-4 text-center w-100">
        <strong>Desarrollado por el Area de Informatica -</strong>
        <strong>{{ new Date().getFullYear() }}</strong>
      </div>
    </v-footer>
  </template>
  
  <script>
  export default {
    
  };
  </script>
  
  <style scoped>

.footer{
    position: fixed;
    bottom: 0;
    width: 100%;
}
  /* Puedes agregar estilos específicos para el Footer aquí si es necesario */
  </style>
  