import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/LoginPage.vue'
// import Register from './components/RegisterPage.vue'
import MainConteiner from './components/MainConteiner.vue'
import AuditarPag from './components/AuditarPag.vue'
import './Axios'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',

      component: Login
    },
    // {
    //     path:'/register',
    //     component: Register
    // },
    {
        path:'/secretaria',
        component: MainConteiner
    },
    {
        path:'/auditar',
        component: AuditarPag
    }
  ]
})

export default router