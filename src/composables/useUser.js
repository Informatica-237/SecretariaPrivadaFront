import { ref } from 'vue';
import axios from 'axios';
import router from '../Router';

const user = ref(null);
const token = ref('');
const isAuthenticated = ref(false);  // Añade esta línea

const register = async (username,email, password) => {
  const response = await axios.post('/auth/register', { username, email, password });
  token.value = response.data.access_token;
  localStorage.setItem('access-token', token.value);
  router.push('/login');
};

const login = async (email, password) => {
  try {
    const response = await axios.post('/auth/login', { email, password });
    token.value = response.data.access_token;
    localStorage.setItem('access-token', token.value);
    console.log('Token de inicio de sesión:', token.value);  // Agrega esta línea
    router.push('/secretaria');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
};

const validateToken = async () => {
  const token = localStorage.getItem('access-token');

  if (token) {
    try {
      const response = await axios.get('/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      user.value = response.data;
      isAuthenticated.value = true;
      console.log('Token validado correctamente');  // Agrega esta línea
    } catch (error) {
      console.error('Error al validar el token:', error);
      localStorage.removeItem('access-token');
      isAuthenticated.value = false;
    }
  }
};


const logout = () => {
  user.value = null;
  isAuthenticated.value = false;
  localStorage.removeItem('access-token');
  console.log('Usuario desconectado');
  router.push('/login'); // Redirige a la página de inicio de sesión
};


export default function useAuth() {
  return { register, login, validateToken, logout, user, isAuthenticated };  // Añade isAuthenticated aquí
}
