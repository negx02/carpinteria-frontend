<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>juarezdesign<span class="accent">.mx</span></h3>
        <p>Ingeniería en madera y diseño contemporáneo. Creamos soluciones estructurales con precisión milimétrica.</p>
      </div>
      <div class="footer-section">
        <h4>Navegación</h4>
        <ul>
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/cotizador/mueble">Cotizador</router-link></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Contacto</h4>
        <p>📍 Guaymas, Sonora, México</p>
        <p>📞 622-123-4567</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 juarezdesign.mx | Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #ffffff;
  color: #1a1a1a;
  padding: 60px 20px 20px;
  border-top: 1px solid #1a1a1a;
  margin-top: 80px;
}
.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}
.footer-section { 
  min-width: 250px; 
  flex: 1; 
}
.footer-section h3 { 
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: -1px;
  margin-bottom: 20px; 
}
.footer-section h4 { 
  font-size: 0.9rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #64748b; 
  margin-bottom: 20px; 
}
.accent {
  color: #0ea5e9;
  font-weight: 500;
}
.footer-section p {
  color: #475569;
  line-height: 1.6;
  font-size: 0.95rem;
}
.footer-section ul { list-style: none; padding: 0; }
.footer-section ul li { margin-bottom: 12px; }
.footer-section a { 
  color: #1a1a1a; 
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}
.footer-section a:hover {
  color: #0ea5e9;
}
.footer-bottom {
  text-align: center;
  margin-top: 60px;
  border-top: 1px solid #f1f5f9;
  padding-top: 25px;
  font-size: 0.85rem;
  color: #94a3b8;
}
</style>