<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCotizadorStore } from '../stores/cotizadorStore'

const router = useRouter()
const store = useCotizadorStore()

const filtrados = computed(() => {
  return store.catalogoAccesorios.filter(acc => acc.para.includes(store.mueble))
})

const toggle = (id) => {
  const index = store.accesorios.indexOf(id)
  if (index === -1) store.accesorios.push(id)
  else store.accesorios.splice(index, 1)
}

const irAtras = () => {
  store.material === 'melamina' ? router.push('/materiales') : router.push('/acabados')
}
</script>

<template>
  <main class="step-container">
    <div class="step-header">
      <span class="step-indicator">PASO 05 / 05</span>
      <h1>COMPLEMENTOS</h1>
      <p>Integra herrajes y tecnología compatible con tu estructura.</p>
    </div>

    <div class="grid-display">
      <div 
        v-for="acc in filtrados" 
        :key="acc.id" 
        class="selection-card" 
        :class="{ 'active': store.accesorios.includes(acc.id) }"
        @click="toggle(acc.id)"
      >
        <div class="card-ui">
          <span class="tag">Herraje</span>
          <div class="check-box">
            <svg v-if="store.accesorios.includes(acc.id)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
        <div class="card-info">
          <h3>{{ acc.nombre }}</h3>
          <p>{{ acc.desc }}</p>
        </div>
      </div>
    </div>

    <div class="nav-bar-actions">
      <button @click="irAtras" class="btn-back">REGRESAR</button>
      <button @click="router.push('/resumen')" class="btn-next">FINALIZAR DISEÑO</button>
    </div>
  </main>
</template>

<style scoped>
.step-container { min-height: 100vh; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; background: #fff; }
.step-header { text-align: center; margin-bottom: 50px; }
.step-indicator { color: #0ea5e9; border: 1.5px solid #0ea5e9; padding: 6px 12px; font-weight: 800; border-radius: 2px; }
.grid-display { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; width: 100%; max-width: 1000px; }
.selection-card { border: 1.5px solid #1a1a1a; padding: 30px; cursor: pointer; transition: all 0.4s ease; background: #fff; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
.selection-card:hover { transform: translateY(-8px); border-color: #0ea5e9; box-shadow: 0 15px 30px rgba(14, 165, 233, 0.15); }
.selection-card.active { border-color: #0ea5e9; background: #f0f9ff; }
.card-ui { display: flex; justify-content: space-between; margin-bottom: 20px; }
.tag { font-size: 0.7rem; font-weight: 800; color: #94a3b8; }
.check-box { width: 22px; height: 22px; border: 1.5px solid #1a1a1a; border-radius: 4px; display: flex; align-items: center; justify-content: center; }
.active .check-box { background: #0ea5e9; border-color: #0ea5e9; color: #fff; }
.card-info h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; }
.card-info p { color: #64748b; font-size: 0.9rem; line-height: 1.5; }
.nav-bar-actions { display: flex; justify-content: space-between; width: 100%; max-width: 1000px; margin-top: 50px; gap: 20px; }
.btn-next { background: #1a1a1a; color: #fff; flex: 1.5; padding: 18px; border: none; cursor: pointer; font-weight: 700; }
.btn-back { background: #fff; border: 1.5px solid #1a1a1a; flex: 1; padding: 18px; cursor: pointer; font-weight: 700; }
</style>