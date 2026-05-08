<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const tiposMuebles = [
  { id: 'cocina', nombre: 'Cocina Integral', descripcion: 'Diseño modular y funcional para tu espacio culinario.' },
  { id: 'closet', nombre: 'Closet / Vestidor', descripcion: 'Sistemas de almacenamiento optimizados a medida.' },
  { id: 'tocador', nombre: 'Tocador', descripcion: 'Estaciones personales con diseño ergonómico y estructurado.' },
  { id: 'alacena', nombre: 'Alacena', descripcion: 'Estructuras de despensa para máxima organización.' },
  { id: 'escritorio', nombre: 'Escritorio', descripcion: 'Superficies de trabajo adaptables y minimalistas.' },
  { id: 'centro_tv', nombre: 'Centro de TV', descripcion: 'Módulos de entretenimiento con gestión de cables.' },
  { id: 'comedor', nombre: 'Comedor', descripcion: 'Mesas estructurales de alta durabilidad y estabilidad.' },
  { id: 'puertas', nombre: 'Puertas Interiores', descripcion: 'Hojas de diseño limpio con ensamblajes precisos.' }
]

const seleccionarMueble = (mueble) => {
  router.push('/cotizador/medidas')
}
</script>

<template>
  <main class="step-container">
    <div class="step-header">
      <span class="step-indicator">PASO 01 / 04</span>
      <h1>SELECCIÓN DE ESTRUCTURA</h1>
      <p>Determina el tipo de proyecto a desarrollar. Cada diseño se adaptará paramétricamente a tus necesidades.</p>
    </div>

    <div class="grid-muebles">
      <div 
        v-for="(mueble, index) in tiposMuebles" 
        :key="mueble.id" 
        class="mueble-card"
        @click="seleccionarMueble(mueble)"
      >
        <div class="card-header">
          <span class="mueble-id">0{{ index + 1 }}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="arrow-icon">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
        <div class="card-body">
          <h3>{{ mueble.nombre }}</h3>
          <p>{{ mueble.descripcion }}</p>
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

.grid-muebles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  max-width: 1200px;
  width: 100%;
}

.mueble-card {
  background-color: #ffffff;
  border: 1px solid #1a1a1a;
  padding: 30px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.03);
}

.mueble-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background-color: #0ea5e9;
  transition: width 0.4s ease;
}

.mueble-card:hover {
  transform: translateY(-5px);
  border-color: #0ea5e9;
  box-shadow: 0 15px 30px rgba(14, 165, 233, 0.15);
}

.mueble-card:hover::after {
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}

.mueble-id {
  font-size: 0.85rem;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: 2px;
  transition: color 0.3s ease;
}

.mueble-card:hover .mueble-id {
  color: #0ea5e9;
}

.arrow-icon {
  width: 20px;
  height: 20px;
  color: #1a1a1a;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.mueble-card:hover .arrow-icon {
  opacity: 1;
  color: #0ea5e9;
  transform: translateX(0);
}

.card-body h3 {
  font-size: 1.2rem;
  color: #1a1a1a;
  margin-bottom: 12px;
  font-weight: 600;
}

.card-body p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
  font-weight: 300;
}

@media (max-width: 768px) {
  .step-header h1 {
    font-size: 2.2rem;
  }
  .grid-muebles {
    grid-template-columns: 1fr;
  }
}
</style>