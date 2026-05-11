<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCotizadorStore } from '../stores/cotizadorStore'

const router = useRouter()
const store = useCotizadorStore()

const accesoriosFiltrados = computed(() => {
  return store.catalogoAccesorios.filter(acc => acc.para.includes(store.mueble))
})

const toggleAccesorio = (id) => {
  const index = store.accesorios.indexOf(id)
  if (index === -1) store.accesorios.push(id)
  else store.accesorios.splice(index, 1)
}

const irAtras = () => {
  if (store.material === 'melamina') {
    router.push('/materiales')
  } else {
    router.push('/acabados')
  }
}
</script>

<template>
  <main class="step-container">
    <div class="step-header">
      <span class="step-indicator">PASO 05 / 05</span>
      <h1>INTEGRACIÓN DE COMPLEMENTOS</h1>
      <p>Selecciona los accesorios compatibles con tu proyecto.</p>
    </div>

    <div class="grid-accesorios">
      <div 
        v-for="accesorio in accesoriosFiltrados" 
        :key="accesorio.id" 
        class="accesorio-card"
        :class="{ 'seleccionado': store.accesorios.includes(accesorio.id) }"
        @click="toggleAccesorio(accesorio.id)"
      >
        <span class="tipo-badge">COMPLEMENTO</span>
        <h3>{{ accesorio.nombre }}</h3>
      </div>
    </div>

    <div class="navigation-buttons">
      <button @click="irAtras" class="btn-secundario">REGRESAR</button>
      <button @click="router.push('/resumen')" class="btn-primario">
        GENERAR COTIZACIÓN
      </button>
    </div>
  </main>
</template>

<style scoped>
.step-container { min-height: 100vh; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; font-family: 'Inter', sans-serif; }
.grid-accesorios { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; max-width: 1000px; width: 100%; }
.accesorio-card { border: 1.5px solid #1a1a1a; padding: 30px; cursor: pointer; transition: all 0.3s; }
.accesorio-card.seleccionado { border-color: #0ea5e9; background-color: #fcfdfe; }
.tipo-badge { font-size: 0.7rem; color: #94a3b8; }
.navigation-buttons { display: flex; justify-content: space-between; width: 100%; max-width: 1000px; margin-top: 50px; gap: 20px; }
.btn-primario { background-color: #1a1a1a; color: #ffffff; flex: 1; padding: 16px; border: none; cursor: pointer; }
.btn-secundario { background-color: #ffffff; border: 1px solid #1a1a1a; flex: 1; padding: 16px; cursor: pointer; }
</style>