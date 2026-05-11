<script setup>
import { useRouter } from 'vue-router'
import { useCotizadorStore } from '../stores/cotizadorStore'

const router = useRouter()
const store = useCotizadorStore()

const tiposMuebles = [
  { id: 'cocina', nombre: 'Cocina Integral', desc: 'Diseño modular optimizado para flujos de trabajo culinario.' },
  { id: 'closet', nombre: 'Closet / Vestidor', desc: 'Sistemas de almacenamiento estructural a medida.' },
  { id: 'tocador', nombre: 'Tocador', desc: 'Estaciones ergonómicas con diseño minimalista.' },
  { id: 'alacena', nombre: 'Alacena', desc: 'Módulos de despensa con alta capacidad de carga.' },
  { id: 'escritorio', nombre: 'Escritorio', desc: 'Superficies de trabajo con gestión de cables integrada.' },
  { id: 'centro_tv', nombre: 'Centro de TV', desc: 'Estructuras multimedia con refuerzos para equipo.' },
  { id: 'comedor', nombre: 'Comedor', desc: 'Mesas de alta estabilidad con acabados de alta resistencia.' },
  { id: 'puertas', nombre: 'Puertas Interiores', desc: 'Hojas de diseño limpio con ensambles de precisión.' }
]

const seleccionar = (item) => {
  store.resetStore()
  store.mueble = item.id
  router.push('/medidas')
}
</script>

<template>
  <main class="step-container">
    <div class="step-header">
      <span class="step-indicator">PASO 01 / 05</span>
      <h1>SELECCIÓN DE ESTRUCTURA</h1>
      <p>Determina el tipo de proyecto. Cada diseño se ajusta paramétricamente a tus necesidades.</p>
    </div>

    <div class="grid-layout">
      <div 
        v-for="(item, index) in tiposMuebles" 
        :key="item.id" 
        class="card-action" 
        :class="{ 'active': store.mueble === item.id }"
        @click="seleccionar(item)"
      >
        <div class="card-head">
          <span class="index">0{{ index + 1 }}</span>
          <div class="check-box">
            <svg v-if="store.mueble === item.id" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
        </div>
        <div class="card-body">
          <h3>{{ item.nombre }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.step-container { min-height: 100vh; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; background: #fff; }
.step-header { text-align: center; margin-bottom: 50px; }
.step-indicator { font-size: 0.75rem; font-weight: 800; color: #0ea5e9; border: 1.5px solid #0ea5e9; padding: 6px 12px; }
.grid-layout { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; width: 100%; max-width: 1200px; }
.card-action { border: 1.5px solid #1a1a1a; padding: 30px; cursor: pointer; transition: 0.4s; background: #fff; min-height: 220px; display: flex; flex-direction: column; justify-content: space-between; }
.card-action:hover { transform: translateY(-8px); border-color: #0ea5e9; box-shadow: 0 15px 35px rgba(14, 165, 233, 0.15); }
.card-action.active { border-color: #0ea5e9; background: #fcfdfe; box-shadow: 0 0 0 1px #0ea5e9; }
.card-head { display: flex; justify-content: space-between; }
.index { font-size: 0.8rem; font-weight: 800; color: #cbd5e1; }
.check-box { width: 22px; height: 22px; border: 1.5px solid #1a1a1a; border-radius: 4px; display: flex; align-items: center; justify-content: center; }
.active .check-box { background: #0ea5e9; border-color: #0ea5e9; color: #fff; }
.card-body h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; }
.card-body p { color: #64748b; font-size: 0.9rem; line-height: 1.6; }
</style>