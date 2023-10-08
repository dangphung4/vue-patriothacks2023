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
        <router-link to="/" class="text">Home</router-link>
        <router-link to="/location" class="text">Location</router-link>
        <router-link to="/map" class="text">Map</router-link>
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
   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100;0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;0,9..40,1000;1,9..40,100;1,9..40,200;1,9..40,300;1,9..40,400;1,9..40,500;1,9..40,600;1,9..40,700;1,9..40,800;1,9..40,900;1,9..40,1000&family=VT323&display=swap');

*{
  font-family: "VT323";
}
  .settings-icon {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;
    cursor: pointer;
  }
  .text {
    font-size: 25px;

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
  