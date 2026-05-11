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

onMounted(() => { if (!store.mueble) router.push('/') })

const procesarCotizacion = async () => {
  if (!nombreCliente.value || !correoCliente.value) {
    alert('Por favor, ingresa los datos de contacto.')
    return
  }
  enviando.value = true
  try {
    const elemento = document.getElementById('documento-pdf')
    const opcionesPdf = {
      margin: 10,
      filename: `Cotizacion_${nombreCliente.value}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 3, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    const pdfBase64 = await html2pdf().set(opcionesPdf).from(elemento).outputPdf('datauristring')

    const respuesta = await fetch('https://carpinteria-backend-production.up.railway.app/api/cotizaciones/enviar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombreCliente: nombreCliente.value,
        correoCliente: correoCliente.value,
        pdfBase64: pdfBase64
      })
    })

    if (respuesta.ok) cotizacionFinalizada.value = true
    else alert('Error al enviar el correo.')
  } catch (error) {
    alert('Error técnico.')
  } finally {
    enviando.value = false
  }
}
</script>

<template>
  <main class="step-container">
    <div class="step-header" v-if="!cotizacionFinalizada">
      <span class="step-indicator">RESUMEN TÉCNICO</span>
      <h1>CONFIGURACIÓN FINAL</h1>
      <p>Valida los parámetros estructurales y el presupuesto estimado del proyecto.</p>
    </div>

    <div class="resumen-viewport" v-if="!cotizacionFinalizada">
      <div id="documento-pdf" class="document-sheet">
        <div class="doc-header">
          <h2>JUAREZ<span>DESIGN</span></h2>
          <div class="doc-meta">
            <span>COTIZACIÓN PRELIMINAR</span>
            <span>PROYECTO: {{ store.mueble?.toUpperCase().replace('_', ' ') }}</span>
          </div>
        </div>

        <div class="doc-body">
          <div class="info-grid">
            <div class="info-block">
              <label>DIMENSIONES</label>
              <p>{{ store.medidas.ancho }} x {{ store.medidas.alto }} x {{ store.medidas.profundidad }} CM</p>
              <span class="technical">VOLUMEN: {{ store.calculoDetallado.areaM2 }} m² | PLANCHAS: {{ store.calculoDetallado.planchasNecesarias }}</span>
            </div>
            <div class="info-block">
              <label>ESPECIFICACIONES</label>
              <p>{{ store.obtenerNombreMaterial }}</p>
              <span class="technical">{{ store.obtenerNombreAcabado }}</span>
            </div>
          </div>

          <div class="acc-block">
            <label>COMPLEMENTOS INSTALADOS</label>
            <div class="acc-list">
              <span v-for="acc in store.obtenerNombresAccesorios" :key="acc" class="acc-tag">{{ acc }}</span>
              <span v-if="!store.accesorios.length" class="empty">Sin accesorios adicionales</span>
            </div>
          </div>

          <div class="total-bar">
            <div class="total-desc">
              <h3>INVERSIÓN ESTIMADA</h3>
              <span>*PRECIO APROXIMADO, ESTE PODRIA VARIAR.</span>
            </div>
            <div class="total-price">
              ${{ store.calculoDetallado.totalFinal.toLocaleString('es-MX', {minimumFractionDigits: 2}) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="client-form" v-if="!cotizacionFinalizada">
      <p>Envía este presupuesto a tu correo personal</p>
      <div class="input-group-res">
        <input type="text" v-model="nombreCliente" placeholder="Nombre del cliente">
        <input type="email" v-model="correoCliente" placeholder="correo@ejemplo.com">
      </div>
    </div>

    <div class="success-portal" v-else>
      <div class="success-icon-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h2>¡ENVÍO EXITOSO!</h2>
      <p>Hola <strong>{{ nombreCliente }}</strong>, hemos enviado tu cotización detallada en PDF a:</p>
      <span class="email-label">{{ correoCliente }}</span>
      <button @click="store.resetStore(); router.push('/')" class="btn-restart">REALIZAR NUEVA COTIZACIÓN</button>
    </div>

    <div class="nav-bar-actions" v-if="!cotizacionFinalizada">
      <button @click="router.back()" class="btn-back" :disabled="enviando">EDITAR</button>
      <button @click="procesarCotizacion" class="btn-next" :disabled="enviando">
        {{ enviando ? 'PROCESANDO PDF...' : 'CONFIRMAR Y ENVIAR' }}
      </button>
    </div>
  </main>
</template>

<style scoped>
.step-container { min-height: 100vh; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; background: #fff; font-family: 'Inter', sans-serif; }
.step-header { text-align: center; margin-bottom: 40px; }
.step-indicator { font-size: 0.75rem; font-weight: 800; color: #0ea5e9; border: 1.5px solid #0ea5e9; padding: 6px 12px; }
.resumen-viewport { width: 100%; display: flex; justify-content: center; background: #f1f5f9; padding: 40px; border-radius: 4px; border: 1px dashed #cbd5e1; margin-bottom: 30px; }
.document-sheet { width: 100%; max-width: 650px; background: #fff; border: 1.5px solid #1a1a1a; box-shadow: 0 25px 50px rgba(0,0,0,0.15); }
.doc-header { background: #1a1a1a; color: #fff; padding: 30px; display: flex; justify-content: space-between; align-items: center; }
.doc-header h2 { font-weight: 300; margin: 0; letter-spacing: -1px; }
.doc-header span { color: #0ea5e9; font-weight: 700; }
.doc-meta { text-align: right; font-size: 0.7rem; letter-spacing: 1px; }
.doc-body { padding: 40px; }
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px; }
.info-block label { font-size: 0.65rem; font-weight: 800; color: #94a3b8; letter-spacing: 1.5px; display: block; margin-bottom: 10px; }
.info-block p { font-size: 1.1rem; font-weight: 700; margin: 0; }
.technical { font-size: 0.8rem; color: #0ea5e9; font-weight: 700; display: block; margin-top: 5px; }
.acc-block label { font-size: 0.65rem; font-weight: 800; color: #94a3b8; display: block; margin-bottom: 15px; }
.acc-list { display: flex; flex-wrap: wrap; gap: 8px; }
.acc-tag { background: #f1f5f9; padding: 6px 14px; font-size: 0.75rem; font-weight: 700; border-radius: 20px; border: 1px solid #e2e8f0; }
.total-bar { background: #0f172a; color: #fff; padding: 30px; margin-top: 40px; display: flex; justify-content: space-between; align-items: center; }
.total-desc h3 { font-size: 1.2rem; font-weight: 300; margin: 0; }
.total-desc span { font-size: 0.65rem; color: #94a3b8; }
.total-price { font-size: 2.2rem; font-weight: 800; color: #38bdf8; }
.client-form { width: 100%; max-width: 650px; text-align: center; margin-bottom: 40px; }
.client-form p { font-weight: 800; font-size: 0.9rem; margin-bottom: 20px; }
.input-group-res { display: flex; gap: 15px; }
.input-group-res input { flex: 1; padding: 15px; border: 1.5px solid #cbd5e1; border-radius: 2px; }
.success-portal { text-align: center; padding: 60px; max-width: 600px; }
.success-icon-wrap { width: 80px; height: 80px; color: #0ea5e9; margin: 0 auto 30px; }
.email-label { display: block; font-size: 1.3rem; font-weight: 800; color: #0ea5e9; margin: 20px 0 40px; }
.btn-restart { background: #1a1a1a; color: #fff; padding: 20px; width: 100%; border: none; font-weight: 700; cursor: pointer; }
.nav-bar-actions { display: flex; justify-content: space-between; width: 100%; max-width: 650px; gap: 20px; }
.btn-next { background: #1a1a1a; color: #fff; flex: 1.5; padding: 18px; border: none; cursor: pointer; font-weight: 700; }
.btn-back { background: #fff; border: 1.5px solid #1a1a1a; flex: 1; padding: 18px; cursor: pointer; font-weight: 700; }
</style>