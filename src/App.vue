<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import TheFooter from './components/Footer.vue' 
</script>

<template>
  <NavBar />
  
  <div class="content-wrapper">
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>

  <TheFooter /> 
</template>

<style>
body { 
  margin: 0; 
  font-family: sans-serif; 
  background: #fffaf0; 
}

.content-wrapper { 
  min-height: 80vh; 
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>