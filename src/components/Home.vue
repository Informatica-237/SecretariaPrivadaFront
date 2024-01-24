<template>
  <div>
    <LoginPage></LoginPage>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import useAuth from '../composables/useUser';
// import MainConteiner from './MainConteiner.vue';
import LoginPage from './LoginPage.vue';

export default {
  name: 'HomePage',
  components:{
    // MainConteiner,
    LoginPage
  },
  setup() {
    const { validateToken, user, isAuthenticated } = useAuth();  // Añade isAuthenticated aquí

    onMounted(async () => {
      await validateToken();
    });

    return {
      user,
      isAuthenticated,  // Añade isAuthenticated aquí
    };
  },
};
</script>
