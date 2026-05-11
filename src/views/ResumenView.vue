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
  if (!store.mueble) router.push('/')
})

const procesarCotizacion = async () => {
  if (!nombreCliente.value || !correoCliente.value) {
    alert('Ingresa nombre y correo para continuar.')
    return
  }
  enviando.value = true
  try {
    const elemento = document.getElementById('documento-pdf')
    const pdfBase64 = await html2pdf().set({
      margin: 10,
      filename: 'Cotizacion_JuarezDesign.pdf',
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(elemento).outputPdf('datauristring')

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
    alert('Error técnico al generar el PDF.')
  } finally {
    enviando.value = false
  }
}

const nuevaCotizacion = () => {
  store.resetStore()
  router.push('/')
}
</script>

<template>
  <main class="step-container">
    <div id="documento-pdf" class="resumen-card" v-if="!cotizacionFinalizada">
      <div class="resumen-section">
        <div class="section-item">
          <label>ESTRUCTURA</label>
          <p>{{ store.mueble?.toUpperCase() }}</p>
        </div>
        <div class="section-item">
          <label>MEDIDAS</label>
          <p>{{ store.medidas.ancho }}x{{ store.medidas.alto }}x{{ store.medidas.profundidad }} CM</p>
        </div>
      </div>
      <div class="resumen-section">
        <div class="section-item">
          <label>MATERIAL</label>
          <p>{{ store.obtenerNombreMaterial }}</p>
        </div>
        <div class="section-item">
          <label>ACABADO</label>
          <p>{{ store.obtenerNombreAcabado }}</p>
        </div>
      </div>
      <div class="resumen-section full">
        <label>ACCESORIOS</label>
        <ul>
          <li v-for="acc in store.obtenerNombresAccesorios" :key="acc">{{ acc }}</li>
          <li v-if="!store.accesorios.length">Ninguno seleccionado</li>
        </ul>
      </div>
      <div class="total-section">
        <h3>TOTAL ESTIMADO: ${{ store.calculoDetallado.totalFinal.toLocaleString() }}</h3>
      </div>
    </div>
    <div class="formulario-cliente" v-if="!cotizacionFinalizada">
      <input type="text" v-model="nombreCliente" placeholder="Nombre">
      <input type="email" v-model="correoCliente" placeholder="Email">
      <button @click="procesarCotizacion" :disabled="enviando">
        {{ enviando ? 'PROCESANDO...' : 'ENVIAR COTIZACIÓN' }}
      </button>
    </div>
    <div class="success-message" v-else>
      <h2>¡ENVIADO!</h2>
      <button @click="nuevaCotizacion" class="btn-primario">INICIAR OTRO</button>
    </div>
  </main>
</template>

<style scoped>
.step-container { padding: 40px; display: flex; flex-direction: column; align-items: center; font-family: sans-serif; }
.resumen-card { border: 2px solid #000; width: 100%; max-width: 600px; padding: 40px; background: #fff; }
.resumen-section { display: flex; justify-content: space-between; margin-bottom: 20px; }
.section-item label { font-size: 0.7rem; font-weight: bold; color: #94a3b8; display: block; }
.total-section { background: #000; color: #fff; padding: 20px; text-align: center; margin-top: 20px; }
.formulario-cliente { margin-top: 30px; display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 600px; }
.formulario-cliente input { padding: 15px; border: 1px solid #000; }
.formulario-cliente button { background: #000; color: #fff; padding: 15px; border: none; cursor: pointer; }
</style>