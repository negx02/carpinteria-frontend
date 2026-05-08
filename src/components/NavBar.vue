<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const irAHome = () => {
  router.push('/')
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="logo-wrapper" @click="irAHome">
        <img src="/imagens/Logo-juarezdesing.mx.jpg" alt="juarezdesign.mx" class="logo-img">
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #ffffff;
  padding: 15px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #1a1a1a;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.05);
}

.nav-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.logo-wrapper {
  cursor: pointer;
  height: 55px;
  width: 55px;
  border-radius: 50%;
  overflow: hidden;
  border: 1.5px solid #1a1a1a;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(14, 165, 233, 0.08);
}

.logo-wrapper:hover {
  transform: scale(1.05);
  border-color: #0ea5e9;
  box-shadow: 0 6px 15px rgba(14, 165, 233, 0.2);
}

.logo-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .navbar {
    padding: 15px 20px;
  }
}
</style>