<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const irACotizador = () => {
  router.push('/presupuestos')
}
</script>

<template>
  <main class="home-container">
    <section class="hero-split">
      <div class="hero-left">
        <h2>INICIA TU PROYECTO</h2>
        <button @click="irACotizador" class="btn-cotiza">
          COTIZAR AHORA
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
      
      <div class="hero-right">
        <h1>juarezdesign<span class="accent">.mx</span></h1>
        <p>Materializamos conceptos a través de la madera. Ingeniería y diseño convergen para crear estructuras minimalistas, funcionales y adaptables a entornos contemporáneos. Precisión en cada milímetro.</p>
      </div>
    </section>

    <section class="features-section">
      <div class="feature-card">
        <div class="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <h3>02 AÑOS</h3>
        <p>Trayectoria optimizando procesos de manufactura y diseño estructural.</p>
      </div>
      
      <div class="feature-card">
        <div class="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
        <h3>ALTA PRECISIÓN</h3>
        <p>Selección rigurosa de materiales y ensamblajes con tolerancias mínimas.</p>
      </div>
      
      <div class="feature-card">
        <div class="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <h3>INTEGRACIÓN TOTAL</h3>
        <p>Acompañamiento técnico desde la planimetría hasta la instalación in situ.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #ffffff;
  color: #1a1a1a;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: center;
}

.hero-split {
  display: flex;
  width: 100%;
  max-width: 1200px;
  min-height: 50vh;
  background-color: #ffffff;
  border: 1px solid #1a1a1a;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(14, 165, 233, 0.1);
}

.hero-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 60px;
  border-right: 1px solid #1a1a1a;
  background-color: #fcfdfe;
}

.hero-left h2 {
  font-size: 0.9rem;
  letter-spacing: 4px;
  color: #64748b;
  margin-bottom: 30px;
  font-weight: 600;
}

.btn-cotiza {
  background-color: #1a1a1a;
  color: #ffffff;
  border: none;
  padding: 16px 32px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.btn-cotiza:hover {
  background-color: #000000;
  box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4);
  transform: translateY(-2px);
}

.btn-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.btn-cotiza:hover .btn-icon {
  transform: translateX(4px);
}

.hero-right {
  flex: 1.2;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-right h1 {
  font-size: 3.5rem;
  margin-bottom: 24px;
  font-weight: 300;
  letter-spacing: -2px;
  color: #1a1a1a;
}

.accent {
  color: #0ea5e9;
  font-weight: 500;
}

.hero-right p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #475569;
  font-weight: 300;
  max-width: 90%;
}

.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1200px;
  width: 100%;
}

.feature-card {
  background-color: #ffffff;
  border: 1.5px solid #1a1a1a;
  padding: 40px 30px;
  border-radius: 4px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.08);
}

.feature-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 4px;
  background-color: #0ea5e9;
  transition: width 0.4s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: #0ea5e9;
  box-shadow: 0 20px 40px rgba(14, 165, 233, 0.15);
}

.feature-card:hover::after {
  width: 100%;
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  margin-bottom: 24px;
  color: #1a1a1a;
  transition: color 0.3s ease;
}

.feature-card:hover .icon-wrapper {
  color: #0ea5e9;
}

.icon-wrapper svg {
  width: 100%;
  height: 100%;
}

.feature-card h3 {
  font-size: 0.85rem;
  letter-spacing: 2px;
  color: #1a1a1a;
  margin-bottom: 16px;
  font-weight: 700;
}

.feature-card p {
  color: #475569;
  line-height: 1.6;
  font-size: 0.95rem;
  font-weight: 400;
}

@media (max-width: 900px) {
  .hero-split {
    flex-direction: column;
  }
  .hero-left, .hero-right {
    padding: 40px 30px;
    border-right: none;
    border-bottom: 1px solid #1a1a1a;
  }
  .hero-right h1 {
    font-size: 2.5rem;
  }
}
</style>