import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCotizadorStore = defineStore('cotizador', () => {
  const mueble = ref('')
  const medidas = ref({ ancho: 0, alto: 0, profundidad: 0 })
  const material = ref(null)
  const acabado = ref(null)
  const accesorios = ref([])

  const catalogoMateriales = [
    { id: 'melamina', nombre: 'Melamina Estándar', precioPlancha: 1200 },
    { id: 'mdf_natural', nombre: 'MDF Natural', precioPlancha: 950 },
    { id: 'mdf_hidrofugo', nombre: 'MDF Hidrófugo', precioPlancha: 1400 },
    { id: 'triplay_pino', nombre: 'Triplay de Pino', precioPlancha: 1100 },
    { id: 'triplay_encino', nombre: 'Triplay de Encino', precioPlancha: 2600 },
    { id: 'madera_pino', nombre: 'Madera Sólida (Pino)', precioPlancha: 1800 },
    { id: 'madera_parota', nombre: 'Madera Sólida (Parota)', precioPlancha: 4500 },
    { id: 'madera_cedro', nombre: 'Madera Sólida (Cedro)', precioPlancha: 3800 }
  ]

  const catalogoAcabados = [
    { id: 'barniz_natural', nombre: 'Barniz Natural', precioM2: 350 },
    { id: 'laca_brillante', nombre: 'Laca Brillante', precioM2: 600 },
    { id: 'mate_profundo', nombre: 'Mate Profundo', precioM2: 500 },
    { id: 'semicerrado', nombre: 'Poro Semicerrado', precioM2: 450 },
    { id: 'color_solido', nombre: 'Color Sólido', precioM2: 550 },
    { id: 'aceite_organico', nombre: 'Aceite Orgánico', precioM2: 400 }
  ]

  const catalogoAccesorios = [
    { id: 'cierre_suave_cajones', nombre: 'Correderas de Cierre Suave', precio: 1200 },
    { id: 'bisagras_premium', nombre: 'Bisagras de Amortiguación', precio: 800 },
    { id: 'iluminacion_led', nombre: 'Iluminación LED Integrada', precio: 2500 },
    { id: 'jaladera_oculta', nombre: 'Perfil Gola (Jaladera Oculta)', precio: 1500 },
    { id: 'organizador_madera', nombre: 'Organizadores Internos', precio: 1800 },
    { id: 'chapa_invisible', nombre: 'Cerradura Invisible RFID', precio: 2200 }
  ]

  const calculoDetallado = computed(() => {
    let total = 0
    
    const anchoM = medidas.value.ancho / 100
    const altoM = medidas.value.alto / 100
    const profM = medidas.value.profundidad / 100
    
    const areaM2 = (2 * (anchoM * altoM)) + (2 * (anchoM * profM)) + (2 * (altoM * profM))

    const m2ConDesperdicio = areaM2 * 1.20
    const planchasNecesarias = Math.ceil(m2ConDesperdicio / 2.97)

    const materialElegido = catalogoMateriales.find(m => m.id === material.value)
    let costoMaterial = 0
    if (materialElegido && planchasNecesarias > 0) {
      costoMaterial = planchasNecesarias * materialElegido.precioPlancha
      total += costoMaterial
    }

    const acabadoElegido = catalogoAcabados.find(a => a.id === acabado.value)
    let costoAcabado = 0
    if (acabadoElegido && areaM2 > 0) {
      costoAcabado = areaM2 * acabadoElegido.precioM2
      total += costoAcabado
    }

    let costoAccesorios = 0
    accesorios.value.forEach(accId => {
      const acc = catalogoAccesorios.find(a => a.id === accId)
      if (acc) costoAccesorios += acc.precio
    })
    total += costoAccesorios

    const manoDeObra = total * 0.60
    total += manoDeObra

    return {
      areaM2: areaM2.toFixed(2),
      planchasNecesarias,
      costoMaterial,
      costoAcabado,
      costoAccesorios,
      manoDeObra,
      totalFinal: total
    }
  })

  const obtenerNombreMaterial = computed(() => {
    const mat = catalogoMateriales.find(m => m.id === material.value)
    return mat ? mat.nombre : 'No seleccionado'
  })

  const obtenerNombreAcabado = computed(() => {
    const ac = catalogoAcabados.find(a => a.id === acabado.value)
    return ac ? ac.nombre : 'No seleccionado'
  })

  const obtenerNombresAccesorios = computed(() => {
    return accesorios.value.map(id => {
      const acc = catalogoAccesorios.find(a => a.id === id)
      return acc ? acc.nombre : ''
    })
  })

  return {
    mueble, medidas, material, acabado, accesorios, 
    calculoDetallado, obtenerNombreMaterial, obtenerNombreAcabado, obtenerNombresAccesorios
  }
})