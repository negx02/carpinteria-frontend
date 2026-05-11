import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCotizadorStore = defineStore('cotizador', () => {
  const mueble = ref('')
  const medidas = ref({ ancho: 0, alto: 0, profundidad: 0 })
  const material = ref(null)
  const acabado = ref(null)
  const accesorios = ref([])

  const catalogoMateriales = [
    { id: 'melamina', nombre: 'Melamina Estándar', desc: 'Superficie resistente a rayaduras. Ideal para interiores de closets y gabinetes.', precioPlancha: 1200, cat: 'Estándar' },
    { id: 'mdf_natural', nombre: 'MDF Natural', desc: 'Tablero liso de densidad media. Perfecto para procesos de lacado y pintura.', precioPlancha: 950, cat: 'Estándar' },
    { id: 'mdf_hidrofugo', nombre: 'MDF Hidrófugo', desc: 'Tratamiento especial resistente a la humedad. Recomendado para cocinas y baños.', precioPlancha: 1400, cat: 'Premium' },
    { id: 'triplay_pino', nombre: 'Triplay de Pino', desc: 'Alta resistencia estructural. Ideal para bases sólidas y estructuras internas.', precioPlancha: 1100, cat: 'Estándar' },
    { id: 'triplay_encino', nombre: 'Triplay de Encino', desc: 'Elegancia superior con chapa natural. Máxima durabilidad con acabado premium.', precioPlancha: 2600, cat: 'Premium' },
    { id: 'madera_pino', nombre: 'Madera Sólida (Pino)', desc: 'Opción clásica y versátil con vetas naturales para estilos rústicos o nórdicos.', precioPlancha: 1800, cat: 'Sólido' },
    { id: 'madera_parota', nombre: 'Madera Sólida (Parota)', desc: 'Veta exótica y llamativa. Alta densidad y resistencia para cubiertas.', precioPlancha: 4500, cat: 'Exótico' },
    { id: 'madera_cedro', nombre: 'Madera Sólida (Cedro)', desc: 'Aroma característico, repelente de plagas y resistente a la humedad.', precioPlancha: 3800, cat: 'Premium' }
  ]

  const catalogoAcabados = [
    { id: 'barniz_natural', nombre: 'Barniz Natural', desc: 'Protección transparente que resalta la veta original.', precioM2: 350, tipo: 'Clásico' },
    { id: 'laca_brillante', nombre: 'Laca Brillante', desc: 'Acabado de alto brillo tipo espejo con gran resistencia.', precioM2: 600, tipo: 'Moderno' },
    { id: 'mate_profundo', nombre: 'Mate Profundo', desc: 'Superficie sin reflejos, suave al tacto y elegante.', precioM2: 500, tipo: 'Minimalista' },
    { id: 'semicerrado', nombre: 'Poro Semicerrado', desc: 'Mantiene la textura natural con protección superior.', precioM2: 450, tipo: 'Técnico' },
    { id: 'color_solido', nombre: 'Color Sólido', desc: 'Acabado uniforme que oculta la veta por completo.', precioM2: 550, tipo: 'Versátil' },
    { id: 'aceite_organico', nombre: 'Aceite Orgánico', desc: 'Nutre la madera desde el interior. Tacto 100% natural.', precioM2: 400, tipo: 'Ecológico' }
  ]

  const catalogoAccesorios = [
    { id: 'cierre_suave_cajones', nombre: 'Correderas Cierre Suave', desc: 'Mecanismo que amortigua y evita golpes.', precio: 1200, para: ['cocina', 'closet', 'tocador', 'alacena', 'escritorio', 'centro_tv'] },
    { id: 'bisagras_premium', nombre: 'Bisagras Amortiguadas', desc: 'Cierre silencioso para puertas de gabinete.', precio: 800, para: ['cocina', 'closet', 'alacena', 'puertas'] },
    { id: 'iluminacion_led', nombre: 'Iluminación LED', desc: 'Tiras LED con sensor de movimiento integrado.', precio: 2500, para: ['cocina', 'closet', 'tocador', 'centro_tv'] },
    { id: 'jaladera_oculta', nombre: 'Perfil Gola', desc: 'Sistema de apertura sin tiradores externos.', precio: 1500, para: ['cocina', 'closet', 'centro_tv'] },
    { id: 'organizador_madera', nombre: 'Organizadores', desc: 'Divisiones internas para cubiertos o ropa.', precio: 1800, para: ['closet', 'tocador', 'alacena'] },
    { id: 'chapa_invisible', nombre: 'Cerradura RFID', desc: 'Apertura electrónica mediante tarjeta.', precio: 2200, para: ['closet', 'puertas'] }
  ]

  const calculoDetallado = computed(() => {
    let total = 0
    const anchoM = medidas.value.ancho / 100
    const altoM = medidas.value.alto / 100
    const profM = medidas.value.profundidad / 100
    const areaM2 = (2 * (anchoM * altoM)) + (2 * (anchoM * profM)) + (2 * (altoM * profM))
    const m2ConDesperdicio = areaM2 * 1.20
    const planchasNecesarias = Math.ceil(m2ConDesperdicio / 2.97) || 0

    const materialElegido = catalogoMateriales.find(m => m.id === material.value)
    let costoMaterial = 0
    if (materialElegido && planchasNecesarias > 0) {
      costoMaterial = planchasNecesarias * materialElegido.precioPlancha
      total += costoMaterial
    }

    const acabadoElegido = catalogoAcabados.find(a => a.id === acabado.value)
    let costoAcabado = 0
    if (acabadoElegido && areaM2 > 0 && material.value !== 'melamina') {
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
    if (material.value === 'melamina') return 'Acabado de Fábrica (Melamina)'
    const ac = catalogoAcabados.find(a => a.id === acabado.value)
    return ac ? ac.nombre : 'Sin acabado adicional'
  })

  const obtenerNombresAccesorios = computed(() => {
    return accesorios.value.map(id => {
      const acc = catalogoAccesorios.find(a => a.id === id)
      return acc ? acc.nombre : ''
    })
  })

  const resetStore = () => {
    mueble.value = ''
    medidas.value = { ancho: 0, alto: 0, profundidad: 0 }
    material.value = null
    acabado.value = null
    accesorios.value = []
  }

  return {
    mueble, medidas, material, acabado, accesorios, catalogoMateriales, catalogoAcabados, catalogoAccesorios,
    calculoDetallado, obtenerNombreMaterial, obtenerNombreAcabado, obtenerNombresAccesorios, resetStore
  }
})