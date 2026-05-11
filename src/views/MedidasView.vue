<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCotizadorStore } from '../stores/cotizadorStore'

const router = useRouter()
const store = useCotizadorStore()

const formularioValido = computed(() => {
  return store.medidas.ancho > 0 && store.medidas.alto > 0 && store.medidas.profundidad > 0
})

const irAtras = () => {
  router.push('/presupuestos')
}

const irSiguiente = () => {
  if (formularioValido.value) {
    router.push('/materiales')
  }
}
</script>

<template>
  <main class="step-container">
    <div class="step-header">
      <span class="step-indicator">PASO 02 / 05</span>
      <h1>ESPECIFICACIONES DE MEDIDA</h1>
      <p>Ingresa las dimensiones aproximadas en centímetros para calcular el volumen estructural del proyecto.</p>
    </div>

    <div class="medidas-form">
      <div class="input-group">
        <label>ANCHO TOTAL (CM)</label>
        <div class="input-wrapper">
          <input type="number" v-model="store.medidas.ancho" placeholder="Ej. 120" min="1">
          <span class="unit">CM</span>
        </div>
      </div>

      <div class="input-group">
        <label>ALTO TOTAL (CM)</label>
        <div class="input-wrapper">
          <input type="number" v-model="store.medidas.alto" placeholder="Ej. 240" min="1">
          <span class="unit">CM</span>
        </div>
      </div>

      <div class="input-group">
        <label>PROFUNDIDAD (CM)</label>
        <div class="input-wrapper">
          <input type="number" v-model="store.medidas.profundidad" placeholder="Ej. 60" min="1">
          <span class="unit">CM</span>
        </div>
      </div>
    </div>

    <div class="navigation-buttons">
      <button @click="irAtras" class="btn-secundario">
        REGRESAR
      </button>
      <button 
        @click="irSiguiente" 
        class="btn-primario"
        :disabled="!formularioValido"
      >
        SIGUIENTE PASO
      </button>
    </div>
  </main>
</template>

<style scoped>
.step-container { min-height: 100vh; background-color: #ffffff; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; font-family: 'Inter', sans-serif; }
.step-header { text-align: center; max-width: 800px; margin-bottom: 60px; }
.step-indicator { display: inline-block; font-size: 0.75rem; font-weight: 700; letter-spacing: 3px; color: #0ea5e9; padding: 6px 12px; border: 1px solid #0ea5e9; border-radius: 2px; }
.medidas-form { display: flex; flex-direction: column; gap: 30px; width: 100%; max-width: 500px; padding: 40px; border: 1px solid #1a1a1a; border-radius: 4px; }
.input-group label { font-size: 0.85rem; font-weight: 700; letter-spacing: 2px; }
.input-wrapper { position: relative; display: flex; align-items: center; }
.input-wrapper input { width: 100%; padding: 16px 50px 16px 20px; font-size: 1.2rem; border: 1.5px solid #1a1a1a; }
.unit { position: absolute; right: 20px; color: #94a3b8; font-weight: 600; }
.navigation-buttons { display: flex; justify-content: space-between; width: 100%; max-width: 500px; margin-top: 40px; gap: 20px; }
.btn-primario { background-color: #1a1a1a; color: #ffffff; flex: 1; padding: 16px; border: none; cursor: pointer; font-weight: 600; }
.btn-primario:disabled { background-color: #e2e8f0; color: #94a3b8; cursor: not-allowed; }
.btn-secundario { background-color: #ffffff; border: 1px solid #1a1a1a; flex: 1; padding: 16px; cursor: pointer; }
</style>