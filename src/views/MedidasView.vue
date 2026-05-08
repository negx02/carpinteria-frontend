<script setup>
import { useRouter } from 'vue-router'
import { useCotizadorStore } from '../stores/cotizadorStore'

const router = useRouter()
const store = useCotizadorStore()

const irAtras = () => {
  router.push('/presupuestos')
}

const irSiguiente = () => {
  router.push('/materiales')
}
</script>

<template>
  <main class="step-container">
    <div class="step-header">
      <span class="step-indicator">PASO 02 / 04</span>
      <h1>ESPECIFICACIONES DE MEDIDA</h1>
      <p>Ingresa las dimensiones aproximadas en centímetros para calcular el volumen estructural del proyecto.</p>
    </div>

    <div class="medidas-form">
      <div class="input-group">
        <label>ANCHO TOTAL (CM)</label>
        <div class="input-wrapper">
          <input type="number" v-model="store.medidas.ancho" placeholder="Ej. 120">
          <span class="unit">CM</span>
        </div>
      </div>

      <div class="input-group">
        <label>ALTO TOTAL (CM)</label>
        <div class="input-wrapper">
          <input type="number" v-model="store.medidas.alto" placeholder="Ej. 240">
          <span class="unit">CM</span>
        </div>
      </div>

      <div class="input-group">
        <label>PROFUNDIDAD (CM)</label>
        <div class="input-wrapper">
          <input type="number" v-model="store.medidas.profundidad" placeholder="Ej. 60">
          <span class="unit">CM</span>
        </div>
      </div>
    </div>

    <div class="navigation-buttons">
      <button @click="irAtras" class="btn-secundario">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon left">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        REGRESAR
      </button>
      <button @click="irSiguiente" class="btn-primario">
        SIGUIENTE PASO
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon right">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </div>
  </main>
</template>

<style scoped>
.step-container {
  min-height: 100vh;
  background-color: #ffffff;
  color: #1a1a1a;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-header {
  text-align: center;
  max-width: 800px;
  margin-bottom: 60px;
}

.step-indicator {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: #0ea5e9;
  margin-bottom: 15px;
  padding: 6px 12px;
  border: 1px solid #0ea5e9;
  border-radius: 2px;
  background-color: rgba(14, 165, 233, 0.05);
}

.step-header h1 {
  font-size: 2.8rem;
  font-weight: 300;
  letter-spacing: -1px;
  color: #1a1a1a;
  margin-bottom: 20px;
}

.step-header p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #475569;
  font-weight: 300;
}

.medidas-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 500px;
  background-color: #ffffff;
  padding: 40px;
  border: 1px solid #1a1a1a;
  border-radius: 4px;
  box-shadow: 0 10px 40px rgba(14, 165, 233, 0.05);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-group label {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: #1a1a1a;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  width: 100%;
  padding: 16px 50px 16px 20px;
  font-size: 1.2rem;
  font-family: 'Inter', sans-serif;
  color: #1a1a1a;
  background-color: #fcfdfe;
  border: 1.5px solid #1a1a1a;
  border-radius: 2px;
  outline: none;
  transition: all 0.3s ease;
}

.input-wrapper input:focus {
  border-color: #0ea5e9;
  box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1);
  background-color: #ffffff;
}

.unit {
  position: absolute;
  right: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #94a3b8;
  pointer-events: none;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  margin-top: 40px;
  gap: 20px;
}

.btn-primario, .btn-secundario {
  flex: 1;
  padding: 16px 24px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.btn-primario {
  background-color: #1a1a1a;
  color: #ffffff;
  border: 1px solid #1a1a1a;
}

.btn-primario:hover {
  background-color: #000000;
  box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);
  transform: translateY(-2px);
}

.btn-secundario {
  background-color: #ffffff;
  color: #1a1a1a;
  border: 1px solid #1a1a1a;
}

.btn-secundario:hover {
  background-color: #f8fafc;
  border-color: #0ea5e9;
  color: #0ea5e9;
}

.btn-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.btn-primario:hover .btn-icon.right {
  transform: translateX(4px);
}

.btn-secundario:hover .btn-icon.left {
  transform: translateX(-4px);
}

@media (max-width: 600px) {
  .step-header h1 {
    font-size: 2.2rem;
  }
  .medidas-form {
    padding: 25px;
  }
  .navigation-buttons {
    flex-direction: column-reverse;
  }
}
</style>