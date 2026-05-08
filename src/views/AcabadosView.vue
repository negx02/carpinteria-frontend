<script setup>
import { useRouter } from 'vue-router'
import { useCotizadorStore } from '../stores/cotizadorStore'

const router = useRouter()
const store = useCotizadorStore()

const catalogoAcabados = [
  { 
    id: 'barniz_natural', 
    nombre: 'Barniz Natural', 
    descripcion: 'Protección transparente que resalta la veta y el color original de la madera.',
    tipo: 'Clásico'
  },
  { 
    id: 'laca_brillante', 
    nombre: 'Laca Brillante', 
    descripcion: 'Acabado de alto brillo tipo espejo con gran resistencia a impactos.',
    tipo: 'Moderno'
  },
  { 
    id: 'mate_profundo', 
    nombre: 'Mate Profundo', 
    descripcion: 'Superficie sin reflejos, suave al tacto y altamente elegante para interiores.',
    tipo: 'Contemporáneo'
  },
  { 
    id: 'semicerrado', 
    nombre: 'Poro Semicerrado', 
    descripcion: 'Permite sentir la textura de la madera manteniendo una protección superior.',
    tipo: 'Técnico'
  },
  { 
    id: 'color_solido', 
    nombre: 'Color Sólido', 
    descripcion: 'Acabado uniforme en cualquier tono (blanco, gris, negro) ocultando la veta.',
    tipo: 'Versátil'
  },
  { 
    id: 'aceite_organico', 
    nombre: 'Aceite Orgánico', 
    descripcion: 'Tratamiento natural que nutre la madera desde el interior. Tacto 100% real.',
    tipo: 'Ecológico'
  }
]

const seleccionarAcabado = (id) => {
  store.acabado = id
}

const irAtras = () => {
  router.push('/materiales')
}

const irSiguiente = () => {
  if (store.acabado) {
    router.push('/accesorios')
  }
}
</script>

<template>
  <main class="step-container">
    <div class="step-header">
      <span class="step-indicator">PASO 04 / 05</span>
      <h1>ESTÉTICA Y ACABADOS</h1>
      <p>Define la textura y el sellado final. El acabado determina la durabilidad visual y la experiencia al tacto de tu mueble.</p>
    </div>

    <div class="grid-acabados">
      <div 
        v-for="acabado in catalogoAcabados" 
        :key="acabado.id" 
        class="acabado-card"
        :class="{ 'seleccionado': store.acabado === acabado.id }"
        @click="seleccionarAcabado(acabado.id)"
      >
        <div class="card-header">
          <span class="tipo-badge">{{ acabado.tipo }}</span>
          <div class="check-custom">
            <svg v-if="store.acabado === acabado.id" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
        <div class="card-body">
          <h3>{{ acabado.nombre }}</h3>
          <p>{{ acabado.descripcion }}</p>
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
        :disabled="!store.acabado"
        :class="{ 'disabled': !store.acabado }"
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

.grid-acabados {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  max-width: 1000px;
  width: 100%;
}

.acabado-card {
  background-color: #ffffff;
  border: 1.5px solid #1a1a1a;
  padding: 30px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.04);
}

.acabado-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(14, 165, 233, 0.12);
  border-color: #0ea5e9;
}

.acabado-card.seleccionado {
  border-color: #0ea5e9;
  background-color: #fcfdfe;
  box-shadow: 0 0 0 1px #0ea5e9;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
}

.tipo-badge {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #94a3b8;
}

.seleccionado .tipo-badge {
  color: #0ea5e9;
}

.check-custom {
  width: 22px;
  height: 22px;
  border: 1.5px solid #1a1a1a;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.seleccionado .check-custom {
  border-color: #0ea5e9;
  background-color: #0ea5e9;
  color: #ffffff;
}

.card-body h3 {
  font-size: 1.25rem;
  color: #1a1a1a;
  margin-bottom: 12px;
  font-weight: 600;
}

.card-body p {
  color: #64748b;
  font-size: 0.9rem;
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
}

.btn-primario:not(.disabled):hover {
  background-color: #000000;
  box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4);
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
}

@media (max-width: 768px) {
  .grid-acabados {
    grid-template-columns: 1fr;
  }
  .navigation-buttons {
    flex-direction: column-reverse;
  }
}
</style>