<template>
    <div>
      <h2>Registro</h2>
      <form @submit.prevent="register">
        <input type="text" v-model="username" placeholder="Usuario" required>
        <input type="email" v-model="email" placeholder="Correo electrónico" required>
        <input type="password" v-model="password" placeholder="Contraseña" required>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import useUser from '../composables/useUser';
  
  export default {
    setup() {
      const { register } = useUser();
      const email = ref('');
      const password = ref('');
      const username = ref('');
  
      const registerUser = async () => {
        await register(username.value, email.value, password.value);
      };
  
      return { username, email, password, register: registerUser };
    },
  };
  </script>
  