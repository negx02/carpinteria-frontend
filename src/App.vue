<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import TheFooter from './components/Footer.vue' 
</script>

<template>
  <NavBar />
  
  <div class="content-wrapper">
    <RouterView />
  </div>

  <TheFooter /> </template>

<style>
body { margin: 0; font-family: sans-serif; background: #fffaf0; }
.content-wrapper { min-height: 80vh; }
</style>