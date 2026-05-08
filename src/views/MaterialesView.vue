<script setup>
import { useRouter } from 'vue-router'
import { useCotizadorStore } from '../stores/cotizadorStore'

const router = useRouter()
const store = useCotizadorStore()

const catalogoMateriales = [
  { 
    id: 'melamina', 
    nombre: 'Melamina Estándar', 
    descripcion: 'Superficie resistente a rayaduras. Ideal para interiores de closets y gabinetes básicos.',
    categoria: 'Estándar'
  },
  { 
    id: 'mdf_natural', 
    nombre: 'MDF Natural', 
    descripcion: 'Tablero liso de densidad media. Perfecto para lacados, pintura y ruteado.',
    categoria: 'Estándar'
  },
  { 
    id: 'mdf_hidrofugo', 
    nombre: 'MDF Hidrófugo', 
    descripcion: 'Tratamiento especial resistente a la humedad. Altamente recomendado para cocinas y baños.',
    categoria: 'Premium'
  },
  { 
    id: 'triplay_pino', 
    nombre: 'Triplay de Pino', 
    descripcion: 'Alta resistencia estructural. Ideal para bases sólidas y estructuras internas duraderas.',
    categoria: 'Estándar'
  },
  { 
    id: 'triplay_encino', 
    nombre: 'Triplay de Encino', 
    descripcion: 'Elegancia superior con chapa natural. Máxima durabilidad con un acabado premium.',
    categoria: 'Premium'
  },
  { 
    id: 'madera_pino', 
    nombre: 'Madera Sólida (Pino)', 
    descripcion: 'Opción clásica y versátil con vetas naturales. Ideal para estilos rústicos o nórdicos.',
    categoria: 'Estándar'
  },
  { 
    id: 'madera_parota', 
    nombre: 'Madera Sólida (Parota)', 
    descripcion: 'Veta exótica y llamativa. Alta densidad y resistencia, excelente para cubiertas y mesas.',
    categoria: 'Premium'
  },
  { 
    id: 'madera_cedro', 
    nombre: 'Madera Sólida (Cedro)', 
    descripcion: 'Aroma característico, repelente natural de plagas y resistente a la humedad. Calidad tradicional.',
    categoria: 'Premium'
  }
]

const seleccionarMaterial = (id) => {
  store.material = id
}

const irAtras = () => {
  router.push('/medidas')
}

const irSiguiente = () => {
  if (store.material) {
    router.push('/acabados')
  }
}
</script>

<template>
  <main class="step-container">
    <div class="step-header">
      <span class="step-indicator">PASO 03 / 04</span>
      <h1>SELECCIÓN DE MATERIAL</h1>
      <p>Elige la materia prima para tu proyecto. Cada opción ofrece propiedades estructurales y estéticas distintas.</p>
    </div>

    <div class="grid-materiales">
      <div 
        v-for="material in catalogoMateriales" 
        :key="material.id" 
        class="material-card"
        :class="{ 'seleccionado': store.material === material.id }"
        @click="seleccionarMaterial(material.id)"
      >
        <div class="card-header">
          <span class="categoria-badge">{{ material.categoria }}</span>
          <div class="radio-custom">
            <div class="radio-inner" v-if="store.material === material.id"></div>
          </div>
        </div>
        <div class="card-body">
          <h3>{{ material.nombre }}</h3>
          <p>{{ material.descripcion }}</p>
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
      <button 
        @click="irSiguiente" 
        class="btn-primario"
        :disabled="!store.material"
        :class="{ 'disabled': !store.material }"
      >
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

.grid-materiales {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  max-width: 1000px;
  width: 100%;
}

.material-card {
  background-color: #fcfdfe;
  border: 1px solid #1a1a1a;
  padding: 30px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}

.material-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(14, 165, 233, 0.1);
  border-color: #0ea5e9;
}

.material-card.seleccionado {
  border-color: #0ea5e9;
  background-color: rgba(14, 165, 233, 0.03);
  box-shadow: 0 0 0 1px #0ea5e9;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
}

.categoria-badge {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #64748b;
  padding: 4px 8px;
  background-color: #f1f5f9;
  border-radius: 2px;
}

.seleccionado .categoria-badge {
  background-color: #0ea5e9;
  color: #ffffff;
}

.radio-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #1a1a1a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.seleccionado .radio-custom {
  border-color: #0ea5e9;
}

.radio-inner {
  width: 10px;
  height: 10px;
  background-color: #0ea5e9;
  border-radius: 50%;
}

.card-body h3 {
  font-size: 1.2rem;
  color: #1a1a1a;
  margin-bottom: 12px;
  font-weight: 600;
}

.card-body p {
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
  font-weight: 300;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  margin-top: 50px;
  gap: 20px;
}

.btn-primario, .btn-secundario {
  padding: 16px 32px;
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
  min-width: 200px;
}

.btn-primario {
  background-color: #1a1a1a;
  color: #ffffff;
  border: 1px solid #1a1a1a;
  margin-left: auto;
}

.btn-primario:not(.disabled):hover {
  background-color: #000000;
  box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);
  transform: translateY(-2px);
}

.btn-primario.disabled {
  background-color: #e2e8f0;
  border-color: #e2e8f0;
  color: #94a3b8;
  cursor: not-allowed;
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

.btn-primario:not(.disabled):hover .btn-icon.right {
  transform: translateX(4px);
}

.btn-secundario:hover .btn-icon.left {
  transform: translateX(-4px);
}

@media (max-width: 768px) {
  .step-header h1 {
    font-size: 2.2rem;
  }
  .grid-materiales {
    grid-template-columns: 1fr;
  }
  .navigation-buttons {
    flex-direction: column-reverse;
  }
  .btn-primario, .btn-secundario {
    width: 100%;
  }
}
</style>