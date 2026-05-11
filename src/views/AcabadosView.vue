<script setup>
import { useRouter } from 'vue-router'
import { useCotizadorStore } from '../stores/cotizadorStore'

const router = useRouter()
const store = useCotizadorStore()

const catalogoAcabados = [
  { id: 'barniz_natural', nombre: 'Barniz Natural', tipo: 'Clásico' },
  { id: 'laca_brillante', nombre: 'Laca Brillante', tipo: 'Moderno' },
  { id: 'mate_profundo', nombre: 'Mate Profundo', tipo: 'Contemporáneo' },
  { id: 'semicerrado', nombre: 'Poro Semicerrado', tipo: 'Técnico' },
  { id: 'color_solido', nombre: 'Color Sólido', tipo: 'Versátil' },
  { id: 'aceite_organico', nombre: 'Aceite Orgánico', tipo: 'Ecológico' }
]

const irSiguiente = () => {
  if (store.acabado) {
    router.push('/accesorios')
  }
}
</script>

<template>
  <main class="step-container">
    <div class="step-header">
      <span class="step-indicator">PASO 04 / 05</span>
      <h1>ESTÉTICA Y ACABADOS</h1>
    </div>

    <div class="grid-acabados">
      <div 
        v-for="acabado in catalogoAcabados" 
        :key="acabado.id" 
        class="acabado-card"
        :class="{ 'seleccionado': store.acabado === acabado.id }"
        @click="store.acabado = acabado.id"
      >
        <span class="tipo-badge">{{ acabado.tipo }}</span>
        <h3>{{ acabado.nombre }}</h3>
      </div>
    </div>

    <div class="navigation-buttons">
      <button @click="router.push('/materiales')" class="btn-secundario">REGRESAR</button>
      <button @click="irSiguiente" class="btn-primario" :disabled="!store.acabado">
        SIGUIENTE PASO
      </button>
    </div>
  </main>
</template>

<style scoped>
.step-container { min-height: 100vh; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; font-family: 'Inter', sans-serif; }
.grid-acabados { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; max-width: 1000px; width: 100%; }
.acabado-card { border: 1.5px solid #1a1a1a; padding: 30px; cursor: pointer; transition: all 0.3s; }
.acabado-card.seleccionado { border-color: #0ea5e9; background-color: #fcfdfe; }
.tipo-badge { font-size: 0.7rem; color: #94a3b8; }
.navigation-buttons { display: flex; justify-content: space-between; width: 100%; max-width: 1000px; margin-top: 50px; gap: 20px; }
.btn-primario { background-color: #1a1a1a; color: #ffffff; flex: 1; padding: 16px; border: none; cursor: pointer; }
.btn-primario:disabled { background-color: #e2e8f0; color: #94a3b8; }
.btn-secundario { background-color: #ffffff; border: 1px solid #1a1a1a; flex: 1; padding: 16px; cursor: pointer; }
</style>