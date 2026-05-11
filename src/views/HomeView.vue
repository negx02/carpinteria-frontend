<script setup>
import { useRouter } from 'vue-router'
import { useCotizadorStore } from '../stores/cotizadorStore'

const router = useRouter()
const store = useCotizadorStore()

const iniciar = () => {
  store.resetStore()
  router.push('/presupuestos')
}
</script>

<template>
  <main class="home-container">
    <section class="hero-split">
      <div class="hero-left">
        <h2>INICIA TU PROYECTO</h2>
        <button @click="iniciar" class="btn-cotiza">
          COTIZAR AHORA
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
      
      <div class="hero-right">
        <h1>juarezdesign<span class="accent">.mx</span></h1>
        <p>Materializamos conceptos a través de la madera. Ingeniería y diseño convergen para crear estructuras minimalistas, funcionales y adaptables a entornos contemporáneos.</p>
      </div>
    </section>

    <section class="features-section">
      <div class="feature-card">
        <div class="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <h3>02 AÑOS</h3>
        <p>Trayectoria optimizando procesos de manufactura y diseño estructural de alta gama.</p>
      </div>
      
      <div class="feature-card">
        <div class="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        </div>
        <h3>ALTA PRECISIÓN</h3>
        <p>Selección rigurosa de materiales y ensamblajes con tolerancias mínimas de error.</p>
      </div>
      
      <div class="feature-card">
        <div class="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
        </div>
        <h3>INTEGRACIÓN TOTAL</h3>
        <p>Acompañamiento técnico desde la planimetría hasta la instalación final in situ.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-container { min-height: 100vh; background-color: #fff; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; gap: 60px; }
.hero-split { display: flex; width: 100%; max-width: 1200px; border: 1.5px solid #1a1a1a; border-radius: 4px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.08); }
.hero-left { flex: 1; padding: 60px; border-right: 1.5px solid #1a1a1a; background: #fcfdfe; display: flex; flex-direction: column; justify-content: center; }
.hero-left h2 { font-size: 0.8rem; letter-spacing: 4px; color: #94a3b8; margin-bottom: 30px; }
.btn-cotiza { background: #1a1a1a; color: #fff; padding: 18px 32px; border: none; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: 0.3s; }
.btn-cotiza:hover { background: #000; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(14, 165, 233, 0.3); }
.btn-icon { width: 20px; }
.hero-right { flex: 1.2; padding: 60px; display: flex; flex-direction: column; justify-content: center; }
.hero-right h1 { font-size: 3.5rem; font-weight: 300; margin-bottom: 20px; letter-spacing: -2px; }
.accent { color: #0ea5e9; font-weight: 700; }
.hero-right p { font-size: 1.1rem; line-height: 1.8; color: #475569; }
.features-section { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; width: 100%; max-width: 1200px; }
.feature-card { border: 1.5px solid #1a1a1a; padding: 40px; transition: 0.4s; position: relative; overflow: hidden; }
.feature-card:hover { transform: translateY(-10px); border-color: #0ea5e9; box-shadow: 0 20px 40px rgba(14, 165, 233, 0.1); }
.icon-wrapper { width: 45px; color: #1a1a1a; margin-bottom: 20px; }
.feature-card:hover .icon-wrapper { color: #0ea5e9; }
.feature-card h3 { font-size: 0.9rem; letter-spacing: 2px; margin-bottom: 15px; }
.feature-card p { font-size: 0.95rem; color: #64748b; line-height: 1.6; }
@media (max-width: 900px) { .hero-split { flex-direction: column; } .hero-left { border-right: none; border-bottom: 1.5px solid #1a1a1a; } }
</style>