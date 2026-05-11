<script setup>
import { useRouter } from 'vue-router'
import { useCotizadorStore } from '../stores/cotizadorStore'

const router = useRouter()
const store = useCotizadorStore()

const irSiguiente = () => { if (store.acabado) router.push('/accesorios') }
</script>

<template>
  <main class="step-container">
    <div class="step-header">
      <span class="step-indicator">PASO 04 / 05</span>
      <h1>ESTÉTICA Y SELLADO</h1>
      <p>Define la textura y protección final de la madera. El acabado garantiza la durabilidad técnica.</p>
    </div>

    <div class="grid-layout">
      <div 
        v-for="item in store.catalogoAcabados" 
        :key="item.id" 
        class="card-action" 
        :class="{ 'active': store.acabado === item.id }"
        @click="store.acabado = item.id"
      >
        <div class="card-head">
          <span class="index">{{ item.tipo }}</span>
          <div class="check-box">
            <svg v-if="store.acabado === item.id" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
        </div>
        <div class="card-body">
          <h3>{{ item.nombre }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </div>

    <div class="actions-nav">
      <button @click="router.push('/materiales')" class="btn-sec">REGRESAR</button>
      <button @click="irSiguiente" class="btn-pri" :disabled="!store.acabado">SIGUIENTE PASO</button>
    </div>
  </main>
</template>

<style scoped>
.step-container { min-height: 100vh; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; background: #fff; }
.grid-layout { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; width: 100%; max-width: 1000px; }
.card-action { border: 1.5px solid #1a1a1a; padding: 30px; cursor: pointer; transition: 0.4s; background: #fff; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
.card-action:hover { transform: translateY(-8px); border-color: #0ea5e9; box-shadow: 0 15px 35px rgba(14, 165, 233, 0.15); }
.card-action.active { border-color: #0ea5e9; background: #fcfdfe; }
.card-head { display: flex; justify-content: space-between; margin-bottom: 20px; }
.index { font-size: 0.7rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
.check-box { width: 22px; height: 22px; border: 1.5px solid #1a1a1a; border-radius: 4px; display: flex; align-items: center; justify-content: center; }
.active .check-box { background: #0ea5e9; border-color: #0ea5e9; color: #fff; }
.card-body h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; }
.card-body p { color: #64748b; font-size: 0.9rem; line-height: 1.6; }
.actions-nav { display: flex; justify-content: space-between; width: 100%; max-width: 1000px; margin-top: 50px; gap: 20px; }
.btn-pri { background: #1a1a1a; color: #fff; flex: 1.5; padding: 18px; border: none; cursor: pointer; font-weight: 700; }
.btn-pri:disabled { background: #e2e8f0; color: #94a3b8; }
.btn-sec { background: #fff; border: 1.5px solid #1a1a1a; flex: 1; padding: 18px; font-weight: 700; cursor: pointer; }
</style>