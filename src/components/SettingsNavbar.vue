<template>
    <div>
      <img
        src="/settings.png"
        alt="Settings"
        class="settings-icon"
        @click="toggleNavbar"
        style="width: 15%;"
      />
      <div v-if="isNavbarVisible" class="navbar">
        <router-link to="/">Home</router-link>
        <router-link to="/location">Enter Location</router-link>
        <router-link to="/map">Map</router-link>
        <!-- More links as needed -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isNavbarVisible = ref(false);
  
  const toggleNavbar = () => {
    isNavbarVisible.value = !isNavbarVisible.value;
  };
  </script>
  
  <style scoped>
  .settings-icon {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;
    cursor: pointer;
  }
  
  .navbar {
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    width: 100px; 
    height: 100%;
    padding: 20px;
    z-index: 4;
    overflow-y: auto;
    font-family: 'Press Start 2P', cursive;
  }
  </style>
  