<script setup>
import { useRouter } from 'vue-router'
import { useCotizadorStore } from '../stores/cotizadorStore'

const router = useRouter()
const store = useCotizadorStore()

const tiposMuebles = [
  { id: 'cocina', nombre: 'Cocina Integral', desc: 'Diseño modular y funcional.' },
  { id: 'closet', nombre: 'Closet / Vestidor', desc: 'Sistemas de almacenamiento optimizados.' },
  { id: 'tocador', nombre: 'Tocador', desc: 'Estaciones personales ergonómicas.' },
  { id: 'alacena', nombre: 'Alacena', desc: 'Estructuras de despensa organizadas.' },
  { id: 'escritorio', nombre: 'Escritorio', desc: 'Superficies de trabajo adaptables.' },
  { id: 'centro_tv', nombre: 'Centro de TV', desc: 'Módulos de entretenimiento.' },
  { id: 'comedor', nombre: 'Comedor', desc: 'Mesas estructurales de alta durabilidad.' },
  { id: 'puertas', nombre: 'Puertas Interiores', desc: 'Hojas de diseño limpio.' }
]

const seleccionarMueble = (mueble) => {
  store.resetStore()
  store.mueble = mueble.id
  router.push('/medidas')
}
</script>

<template>
  <main class="step-container">
    <div class="step-header">
      <span class="step-indicator">PASO 01 / 05</span>
      <h1>SELECCIÓN DE ESTRUCTURA</h1>
      <p>Determina el tipo de proyecto a desarrollar. Cada diseño se adaptará paramétricamente a tus necesidades.</p>
    </div>
    <div class="grid-muebles">
      <div v-for="(mueble, index) in tiposMuebles" :key="mueble.id" class="mueble-card" @click="seleccionarMueble(mueble)">
        <div class="card-header">
          <span class="mueble-id">0{{ index + 1 }}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="arrow-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
        <div class="card-body">
          <h3>{{ mueble.nombre }}</h3>
          <p>{{ mueble.desc }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.step-container { min-height: 100vh; background-color: #ffffff; color: #1a1a1a; font-family: 'Inter', sans-serif; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; }
.step-header { text-align: center; max-width: 800px; margin-bottom: 60px; }
.step-indicator { display: inline-block; font-size: 0.75rem; font-weight: 700; letter-spacing: 3px; color: #0ea5e9; margin-bottom: 15px; padding: 6px 12px; border: 1px solid #0ea5e9; border-radius: 2px; }
.step-header h1 { font-size: 2.8rem; font-weight: 300; margin-bottom: 20px; }
.step-header p { font-size: 1.1rem; color: #475569; }
.grid-muebles { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; max-width: 1200px; width: 100%; }
.mueble-card { background-color: #ffffff; border: 1px solid #1a1a1a; padding: 30px; border-radius: 4px; cursor: pointer; transition: all 0.3s ease; min-height: 200px; display: flex; flex-direction: column; justify-content: space-between; }
.mueble-card:hover { transform: translateY(-5px); border-color: #0ea5e9; box-shadow: 0 15px 30px rgba(14, 165, 233, 0.15); }
.card-header { display: flex; justify-content: space-between; }
.mueble-id { font-size: 0.85rem; font-weight: 600; color: #94a3b8; }
.arrow-icon { width: 20px; height: 20px; opacity: 0; transition: all 0.3s ease; }
.mueble-card:hover .arrow-icon { opacity: 1; color: #0ea5e9; }
.card-body h3 { font-size: 1.2rem; margin-bottom: 12px; }
.card-body p { color: #64748b; font-size: 0.95rem; }
</style>