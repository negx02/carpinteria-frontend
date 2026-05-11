<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCotizadorStore } from '../stores/cotizadorStore'
import html2pdf from 'html2pdf.js'

const router = useRouter()
const store = useCotizadorStore()

const cotizacionFinalizada = ref(false)
const enviando = ref(false)

const nombreCliente = ref('')
const correoCliente = ref('')

onMounted(() => {
  if (!store.mueble) {
    router.push('/')
  }
})

const irInicio = () => {
  store.mueble = ''
  store.medidas = { ancho: 0, alto: 0, profundidad: 0 }
  store.material = null
  store.acabado = null
  store.accesorios = []
  router.push('/')
}

const procesarCotizacion = async () => {
  if (!nombreCliente.value || !correoCliente.value) {
    alert('Por favor, ingresa tu nombre y correo para enviar la cotización.')
    return
  }

  enviando.value = true

  try {
    const elemento = document.getElementById('documento-pdf')
    
    const opcionesPdf = {
      margin: 10,
      filename: 'Cotizacion_JuarezDesign.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    const pdfBase64 = await html2pdf().set(opcionesPdf).from(elemento).outputPdf('datauristring')

    const respuesta = await fetch('https://carpinteria-backend-production.up.railway.app/api/cotizaciones/enviar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombreCliente: nombreCliente.value,
        correoCliente: correoCliente.value,
        pdfBase64: pdfBase64
      })
    })

    const resultado = await respuesta.json()

    if (respuesta.ok) {
      cotizacionFinalizada.value = true
    } else {
      alert('Error: ' + (resultado.error || 'No se pudo conectar'))
    }
  } catch (error) {
    alert('Ocurrió un error al generar o enviar el PDF.')
  } finally {
    enviando.value = false
  }
}
</script>

<template>
  <main class="step-container">
    <div class="step-header" v-if="!cotizacionFinalizada">
      <span class="step-indicator">RESUMEN FINAL</span>
      <h1>PRESUPUESTO ESTIMADO</h1>
      <p>Revisa los detalles técnicos de tu configuración. El sistema ha calculado el volumen usando planchas estándar.</p>
    </div>

    <div id="documento-pdf" class="resumen-card" v-if="!cotizacionFinalizada">
      <div class="resumen-section">
        <div class="section-item">
          <label>ESTRUCTURA</label>
          <p>{{ store.mueble || 'No definido' }}</p>
        </div>
        <div class="section-item">
          <label>DIMENSIONES Y VOLUMEN</label>
          <p>{{ store.medidas.ancho }} x {{ store.medidas.alto }} x {{ store.medidas.profundidad }} CM</p>
          <span class="metadata">Área est.: {{ store.calculoDetallado?.areaM2 || 0 }} m² | Planchas est.: {{ store.calculoDetallado?.planchasNecesarias || 0 }}</span>
        </div>
      </div>

      <div class="resumen-section">
        <div class="section-item">
          <label>MATERIAL BASE</label>
          <p>{{ store.obtenerNombreMaterial }}</p>
        </div>
        <div class="section-item">
          <label>ACABADO FINAL</label>
          <p>{{ store.obtenerNombreAcabado }}</p>
        </div>
      </div>

      <div class="resumen-section full">
        <label>ACCESORIOS E INTEGRACIONES</label>
        <ul v-if="store.obtenerNombresAccesorios.length > 0">
          <li v-for="acc in store.obtenerNombresAccesorios" :key="acc">{{ acc }}</li>
        </ul>
        <p v-else style="color: #64748b; font-size: 0.9rem;">Sin accesorios adicionales</p>
      </div>

      <div class="total-section">
        <div class="total-label">
          <h3>TOTAL ESTIMADO</h3>
          <span>*Sujeto a cambios tras validación técnica in situ. Incluye manufactura.</span>
        </div>
        <div class="total-amount">
          ${{ store.calculoDetallado?.totalFinal.toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}
        </div>
      </div>
    </div>

    <div class="formulario-cliente" v-if="!cotizacionFinalizada">
      <p class="form-title">Envía esta cotización a tu correo</p>
      <div class="input-row">
        <input type="text" v-model="nombreCliente" placeholder="Tu Nombre">
        <input type="email" v-model="correoCliente" placeholder="Tu Correo Electrónico">
      </div>
    </div>

    <div class="success-message" v-else>
      <div class="success-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h2>COTIZACIÓN REGISTRADA</h2>
      <p>Hemos enviado un PDF con el presupuesto a <strong>{{ correoCliente }}</strong>.</p>
      <button @click="irInicio" class="btn-primario">VOLVER AL INICIO</button>
    </div>

    <div class="navigation-buttons" v-if="!cotizacionFinalizada">
      <button @click="router.back()" class="btn-secundario" :disabled="enviando">EDITAR</button>
      <button @click="procesarCotizacion" class="btn-primario" :disabled="enviando">
        {{ enviando ? 'GENERANDO PDF...' : 'ENVIAR Y GUARDAR' }}
        <svg v-if="!enviando" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
          <polyline points="17 21 17 13 7 13 7 21"></polyline>
          <polyline points="7 3 7 8 15 8"></polyline>
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
  font-family: 'Inter', sans-serif;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-header {
  text-align: center;
  margin-bottom: 50px;
}

.step-indicator {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: #0ea5e9;
  border: 1px solid #0ea5e9;
  padding: 6px 12px;
  border-radius: 2px;
}

.resumen-card {
  width: 100%;
  max-width: 700px;
  border: 1.5px solid #1a1a1a;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(14, 165, 233, 0.1);
  background-color: #ffffff;
}

.resumen-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 30px;
  border-bottom: 1px solid #f1f5f9;
  gap: 20px;
}

.resumen-section.full {
  display: block;
}

.section-item label, .resumen-section.full label {
  display: block;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #94a3b8;
  margin-bottom: 10px;
}

.section-item p {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
}

.metadata {
  display: block;
  font-size: 0.8rem;
  color: #0ea5e9;
  margin-top: 5px;
  font-weight: 600;
}

.resumen-section ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0;
}

.resumen-section li {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 6px 14px;
  font-size: 0.85rem;
  border-radius: 20px;
}

.total-section {
  background-color: #0f172a;
  color: #ffffff;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label h3 {
  font-size: 1.5rem;
  font-weight: 300;
  margin: 0 0 5px 0;
}

.total-label span {
  font-size: 0.75rem;
  color: #94a3b8;
}

.total-amount {
  font-size: 2.8rem;
  font-weight: 700;
  color: #38bdf8;
  text-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
}

.formulario-cliente {
  width: 100%;
  max-width: 700px;
  margin-top: 30px;
  padding: 25px;
  border: 1px dashed #cbd5e1;
  border-radius: 4px;
  background-color: #f8fafc;
}

.form-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 15px;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.input-row {
  display: flex;
  gap: 15px;
}

.input-row input {
  flex: 1;
  padding: 14px;
  border: 1px solid #cbd5e1;
  border-radius: 2px;
  font-family: 'Inter', sans-serif;
  outline: none;
  transition: border-color 0.3s;
}

.input-row input:focus {
  border-color: #0ea5e9;
}

.navigation-buttons {
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
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
}

.btn-primario {
  background-color: #1a1a1a;
  color: #ffffff;
  border: none;
  flex: 2;
}

.btn-primario:not(:disabled):hover {
  background-color: #000000;
  box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4);
}

.btn-primario:disabled {
  opacity: 0.7;
  cursor: wait;
}

.btn-secundario {
  background-color: #ffffff;
  border: 1px solid #1a1a1a;
  flex: 1;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.success-message {
  text-align: center;
  padding: 60px;
}

.success-icon {
  color: #0ea5e9;
  width: 80px;
  height: 80px;
  margin: 0 auto 30px;
}

@media (max-width: 700px) {
  .resumen-section { grid-template-columns: 1fr; }
  .total-section { flex-direction: column; text-align: center; gap: 20px; }
  .input-row { flex-direction: column; }
  .navigation-buttons { flex-direction: column-reverse; }
}
</style>