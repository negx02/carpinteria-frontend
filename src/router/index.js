import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PresupuestosView from '../views/PresupuestosView.vue'
import GaleriaView from '../views/GaleriaView.vue'
import MedidasView from '../views/MedidasView.vue'
import MaterialesView from '../views/MaterialesView.vue'
import AcabadosView from '../views/AcabadosView.vue'
import AccesoriosView from '../views/AccesoriosView.vue'
import ResumenView from '../views/ResumenView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/presupuestos',
      name: 'presupuestos',
      component: PresupuestosView
    },
    {
      path: '/galeria',
      name: 'galeria',
      component: GaleriaView
    },
    {
      path: '/medidas',
      name: 'medidas',
      component: MedidasView
    },
    {
      path: '/materiales',
      name: 'materiales',
      component: MaterialesView
    },
    {
      path: '/acabados',
      name: 'acabados',
      component: AcabadosView
    },
    {
      path: '/accesorios',
      name: 'accesorios',
      component: AccesoriosView
    },
    {
      path: '/resumen',
      name: 'resumen',
      component: ResumenView
    }
  ]
})

export default router