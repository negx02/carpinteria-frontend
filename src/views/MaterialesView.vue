<script setup>
import { useRouter } from 'vue-router'
import { useCotizadorStore } from '../stores/cotizadorStore'

const router = useRouter()
const store = useCotizadorStore()

const catalogoMateriales = [
  { id: 'melamina', nombre: 'Melamina Estándar', categoria: 'Estándar' },
  { id: 'mdf_natural', nombre: 'MDF Natural', categoria: 'Estándar' },
  { id: 'mdf_hidrofugo', nombre: 'MDF Hidrófugo', categoria: 'Premium' },
  { id: 'triplay_pino', nombre: 'Triplay de Pino', categoria: 'Estándar' },
  { id: 'triplay_encino', nombre: 'Triplay de Encino', categoria: 'Premium' },
  { id: 'madera_pino', nombre: 'Madera Sólida (Pino)', categoria: 'Estándar' },
  { id: 'madera_parota', nombre: 'Madera Sólida (Parota)', categoria: 'Premium' },
  { id: 'madera_cedro', nombre: 'Madera Sólida (Cedro)', categoria: 'Premium' }
]

const irSiguiente = () => {
  if (store.material) {
    if (store.material === 'melamina') {
      store.acabado = null
      router.push('/accesorios')
    } else {
      router.push('/acabados')
    }
  }
}
</script>

<template>
  <main class="step-container">
    <div class="step-header">
      <span class="step-indicator">PASO 03 / 05</span>
      <h1>SELECCIÓN DE MATERIAL</h1>
    </div>

    <div class="grid-materiales">
      <div 
        v-for="material in catalogoMateriales" 
        :key="material.id" 
        class="material-card"
        :class="{ 'seleccionado': store.material === material.id }"
        @click="store.material = material.id"
      >
        <span class="categoria-badge">{{ material.categoria }}</span>
        <h3>{{ material.nombre }}</h3>
      </div>
    </div>

    <div class="navigation-buttons">
      <button @click="router.push('/medidas')" class="btn-secundario">REGRESAR</button>
      <button @click="irSiguiente" class="btn-primario" :disabled="!store.material">
        SIGUIENTE PASO
      </button>
    </div>
  </main>
</template>

<style scoped>
.step-container { min-height: 100vh; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; font-family: 'Inter', sans-serif; }
.grid-materiales { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; max-width: 1000px; width: 100%; }
.material-card { border: 1px solid #1a1a1a; padding: 30px; cursor: pointer; transition: all 0.3s; }
.material-card.seleccionado { border-color: #0ea5e9; background-color: rgba(14, 165, 233, 0.03); }
.categoria-badge { font-size: 0.75rem; font-weight: 600; color: #64748b; }
.navigation-buttons { display: flex; justify-content: space-between; width: 100%; max-width: 1000px; margin-top: 50px; gap: 20px; }
.btn-primario { background-color: #1a1a1a; color: #ffffff; flex: 1; padding: 16px; border: none; cursor: pointer; }
.btn-primario:disabled { background-color: #e2e8f0; color: #94a3b8; }
.btn-secundario { background-color: #ffffff; border: 1px solid #1a1a1a; flex: 1; padding: 16px; cursor: pointer; }
</style>