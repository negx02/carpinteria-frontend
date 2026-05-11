<script setup>
import { useRouter } from 'vue-router'
import { useCotizadorStore } from '../stores/cotizadorStore'

const router = useRouter()
const store = useCotizadorStore()

const tiposMuebles = [
  { id: 'cocina', nombre: 'Cocina Integral', desc: 'Diseño modular y funcional optimizado para el entorno culinario contemporáneo.' },
  { id: 'closet', nombre: 'Closet / Vestidor', desc: 'Sistemas de almacenamiento inteligente con optimización de volumen a medida.' },
  { id: 'tocador', nombre: 'Tocador', desc: 'Estaciones personales con diseño ergonómico y acabados de alta precisión.' },
  { id: 'alacena', nombre: 'Alacena', desc: 'Estructuras de despensa robustas diseñadas para máxima organización técnica.' },
  { id: 'escritorio', nombre: 'Escritorio', desc: 'Superficies de trabajo adaptables con integración de gestión de cables.' },
  { id: 'centro_tv', nombre: 'Centro de TV', desc: 'Módulos de entretenimiento con soportes reforzados y estética minimalista.' },
  { id: 'comedor', nombre: 'Comedor', desc: 'Mesas estructurales de alta estabilidad con resistencia superior al impacto.' },
  { id: 'puertas', nombre: 'Puertas Interiores', desc: 'Hojas de diseño limpio con ensamblajes precisos y herrajes de gama alta.' }
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
      <p>Determina el tipo de proyecto a desarrollar. Cada diseño se adaptará paramétricamente a tus necesidades técnicas.</p>
    </div>

    <div class="grid-muebles">
      <div 
        v-for="(mueble, index) in tiposMuebles" 
        :key="mueble.id" 
        class="selection-card" 
        :class="{ 'active': store.mueble === mueble.id }"
        @click="seleccionarMueble(mueble)"
      >
        <div class="card-ui">
          <span class="id-tag">PROYECTO 0{{ index + 1 }}</span>
          <div class="check-box">
            <svg v-if="store.mueble === mueble.id" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
        <div class="card-info">
          <h3>{{ mueble.nombre }}</h3>
          <p>{{ mueble.desc }}</p>
        </div>
        <div class="card-footer">
          <span class="action-text">INICIAR CONFIGURACIÓN</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.step-container {
  min-height: 100vh;
  background-color: #ffffff;
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
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
  font-weight: 800;
  letter-spacing: 3px;
  color: #0ea5e9;
  margin-bottom: 15px;
  padding: 6px 12px;
  border: 1.5px solid #0ea5e9;
  border-radius: 2px;
}

.step-header h1 {
  font-size: 3rem;
  font-weight: 300;
  letter-spacing: -2px;
  margin-bottom: 20px;
}

.step-header p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #475569;
  font-weight: 400;
}

.grid-muebles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1250px;
  width: 100%;
}

.selection-card {
  background-color: #ffffff;
  border: 1.5px solid #1a1a1a;
  padding: 35px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 250px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  position: relative;
}

.selection-card:hover {
  transform: translateY(-10px);
  border-color: #0ea5e9;
  box-shadow: 0 20px 40px rgba(14, 165, 233, 0.15);
}

.selection-card.active {
  border-color: #0ea5e9;
  background-color: #fcfdfe;
  box-shadow: 0 0 0 1px #0ea5e9;
}

.card-ui {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.id-tag {
  font-size: 0.7rem;
  font-weight: 800;
  color: #94a3b8;
  letter-spacing: 2px;
}

.check-box {
  width: 24px;
  height: 24px;
  border: 1.5px solid #1a1a1a;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.active .check-box {
  background-color: #0ea5e9;
  border-color: #0ea5e9;
  color: #ffffff;
}

.card-info h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.card-info p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
}

.card-footer {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f1f5f9;
  padding-top: 20px;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.selection-card:hover .card-footer {
  opacity: 1;
}

.action-text {
  font-size: 0.75rem;
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: 1px;
}

.arrow-icon {
  width: 20px;
  height: 20px;
  color: #1a1a1a;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.selection-card:hover .arrow-icon {
  transform: translateX(0);
  color: #0ea5e9;
}

@media (max-width: 768px) {
  .grid-muebles {
    grid-template-columns: 1fr;
  }
}
</style>