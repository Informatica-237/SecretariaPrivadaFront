<template>
  <div id="app">
    <!-- <Nav v-if="!isAuthenticated"></Nav> -->
    <!-- <LoginPage v-if="!isAuthenticated" ></LoginPage> -->
        <router-view ></router-view>
      
    <Footer></Footer>
  </div>
</template>

<script>

import useAuth from './composables/useUser';
// import Nav from './components/Nav.vue';
import Footer from './components/FooterMuni.vue';
// import LoginPage from './components/LoginPage.vue';

export default {
  name: 'App',
  components: {
  //  Nav,
   Footer,
  //  LoginPage
  },
  
  setup() {
    const { isAuthenticated } = useAuth();
    return {
      isAuthenticated,
    };
  },
  async created() {
    const { validateToken } = useAuth();
    try {
      await validateToken();
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

#app{
  font-family: 'Roboto', sans-serif;
}
/* Estilos de tu aplicación */
</style>
