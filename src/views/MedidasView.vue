<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCotizadorStore } from '../stores/cotizadorStore'

const router = useRouter()
const store = useCotizadorStore()

const isValid = computed(() => {
  return store.medidas.ancho > 0 && store.medidas.alto > 0 && store.medidas.profundidad > 0
})
</script>

<template>
  <main class="step-container">
    <div class="step-header">
      <span class="step-indicator">PASO 02 / 05</span>
      <h1>ESPECIFICACIONES TÉCNICAS</h1>
      <p>Define el volumen estructural en centímetros. Estos datos alimentan el cálculo de material base.</p>
    </div>

    <div class="form-grid">
      <div class="field-group">
        <label>ANCHO (CM)</label>
        <div class="input-unit">
          <input type="number" v-model="store.medidas.ancho" placeholder="0" min="1">
          <span class="unit">CM</span>
        </div>
      </div>
      <div class="field-group">
        <label>ALTO (CM)</label>
        <div class="input-unit">
          <input type="number" v-model="store.medidas.alto" placeholder="0" min="1">
          <span class="unit">CM</span>
        </div>
      </div>
      <div class="field-group">
        <label>PROFUNDIDAD (CM)</label>
        <div class="input-unit">
          <input type="number" v-model="store.medidas.profundidad" placeholder="0" min="1">
          <span class="unit">CM</span>
        </div>
      </div>
    </div>

    <div class="actions">
      <button @click="router.push('/presupuestos')" class="btn-sec">REGRESAR</button>
      <button @click="router.push('/materiales')" class="btn-pri" :disabled="!isValid">SIGUIENTE PASO</button>
    </div>
  </main>
</template>

<style scoped>
.step-container { min-height: 100vh; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; background: #fff; }
.form-grid { display: flex; flex-direction: column; gap: 30px; width: 100%; max-width: 500px; padding: 40px; border: 1.5px solid #1a1a1a; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
.field-group label { font-size: 0.75rem; font-weight: 800; letter-spacing: 2px; display: block; margin-bottom: 10px; }
.input-unit { position: relative; display: flex; align-items: center; }
.input-unit input { width: 100%; padding: 18px; font-size: 1.3rem; border: 1.5px solid #1a1a1a; outline: none; transition: 0.3s; }
.input-unit input:focus { border-color: #0ea5e9; box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1); }
.unit { position: absolute; right: 20px; font-weight: 700; color: #cbd5e1; }
.actions { display: flex; gap: 20px; width: 100%; max-width: 500px; margin-top: 40px; }
.btn-pri { background: #1a1a1a; color: #fff; flex: 1.5; padding: 18px; border: none; font-weight: 700; cursor: pointer; }
.btn-pri:disabled { background: #e2e8f0; color: #94a3b8; cursor: not-allowed; }
.btn-sec { background: #fff; border: 1.5px solid #1a1a1a; flex: 1; padding: 18px; font-weight: 700; cursor: pointer; }
</style>