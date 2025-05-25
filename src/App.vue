<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <div class="container mt-4">
    <router-view />
  </div>
</template>

<style>
#app {
  background-color: #f8f9fa;
  min-height: 100vh;
}
</style>
