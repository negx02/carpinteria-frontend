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

    <div class="form-wrapper">
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

    <div class="nav-bar-actions">
      <button @click="router.push('/presupuestos')" class="btn-back">REGRESAR</button>
      <button @click="router.push('/materiales')" class="btn-next" :disabled="!isValid">SIGUIENTE PASO</button>
    </div>
  </main>
</template>

<style scoped>
.step-container { min-height: 100vh; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; background: #fff; }
.step-header { text-align: center; margin-bottom: 50px; }
.step-indicator { color: #0ea5e9; border: 1px solid #0ea5e9; padding: 6px 12px; font-weight: 800; letter-spacing: 2px; }
.form-wrapper { display: flex; flex-direction: column; gap: 30px; width: 100%; max-width: 500px; padding: 40px; border: 1.5px solid #1a1a1a; border-radius: 4px; background: #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.02); transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); }
.form-wrapper:hover { transform: translateY(-8px); border-color: #0ea5e9; box-shadow: 0 15px 35px rgba(14, 165, 233, 0.15); }
.field-group label { font-size: 0.75rem; font-weight: 800; letter-spacing: 2px; display: block; margin-bottom: 10px; color: #94a3b8; }
.input-unit { position: relative; display: flex; align-items: center; }
.input-unit input { width: 100%; padding: 18px; font-size: 1.3rem; font-weight: 700; border: 1.5px solid #1a1a1a; border-radius: 4px; outline: none; transition: 0.3s; color: #1a1a1a; }
.input-unit input:focus { border-color: #0ea5e9; box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1); background: #fcfdfe; }
.unit { position: absolute; right: 20px; font-weight: 800; color: #cbd5e1; }
.nav-bar-actions { display: flex; justify-content: space-between; width: 100%; max-width: 500px; margin-top: 50px; gap: 20px; }
.btn-next { background: #1a1a1a; color: #fff; flex: 1.5; padding: 18px; border: none; cursor: pointer; font-weight: 700; letter-spacing: 1px; border-radius: 4px; }
.btn-next:disabled { background: #e2e8f0; color: #94a3b8; cursor: not-allowed; }
.btn-back { background: #fff; border: 1.5px solid #1a1a1a; flex: 1; padding: 18px; cursor: pointer; font-weight: 700; border-radius: 4px; }
</style>