<template>
     <div class="homepage" :class="{ dark: isDarkMode }">
    <img :src="backgroundImage" alt="Background" class="background" />
    
      <img src="/btnlogo.png" alt="Logo" class="logo" />
      <img src="/curse.gif" alt="Character" class="character" style="width: 30%; left: 35%; top:35%;" />
      <img
        src="/settings.png"
        alt="Settings"
        class="settings-icon"
        @click="toggleNavbar"
        style="width: 15%;"
      />
      <router-link to="/location">
          <img src="/yellowbutton.png" alt="start-button" class="start-button" />
          <img src="/starttext.png" alt="start-text" class="start-text"/>
    </router-link>
      <button class="toggle-mode" @click="toggleMode">
      Toggle Light/Dark Mode
    </button>
      <div v-if="isNavbarVisible" class="navbar">
        <!-- Add your navigation items here -->
        <router-link to="/">Home</router-link>
        <router-link to="/location">Enter Location</router-link>
        <router-link to="/map">Map</router-link>
        <!-- More links as needed -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const isNavbarVisible = ref(false);
  const isDarkMode = ref(false); 

  const toggleNavbar = () => {
    isNavbarVisible.value = !isNavbarVisible.value;
  };

  const toggleMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

const backgroundImage = computed(() => 
    isDarkMode.value ? '/GMUDark.png' : '/GMUlight.png' 
);
  </script>
  
  <style scoped>
  .homepage {
    position: relative;
    height: 100vh; /* Adjust as per your design */
    width: 100%;
    overflow: hidden;
  }
  
  .homepage.dark .background {
  filter: brightness(0.7); /* Adjust brightness for dark mode or change the image source for dark mode */
}
  .background {
    width: 100%;
    height: 100%; /* You may want to adjust this */
    z-index: 1;
  }
  .logo {
  position: absolute;
  width: 40%;
  top: 7%; /* Adjust as needed */
  left: 45%; /* Adjust as needed */
  z-index: 3;
}
.toggle-mode {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 5;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive;
  font-weight: "bold"; /* This is an 8-bit style font from Google Fonts */
}
  
  .character {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }
  
  .settings-icon {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;
    cursor: pointer;
  }
  .start-button{
    z-index: 6;
    position: absolute;
    cursor: pointer;
    bottom : 50px;
    width : 40%;
    left: 65%; /* Center the button horizontally */
    transform: translateX(-50%);
    bottom:15%;
    
  }
  .start-text{
    z-index: 6;
    position: absolute;
    cursor: pointer;
    bottom : 50px;
    width : 17%;
    left: 65%; /* Center the button horizontally */
    transform: translateX(-50%);
    bottom:19%;
  }
  .navbar {
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(0,0,0,0.7); /* Adjust as per your design */
    color: white;
    width: 100px; /* Adjust as needed */
    height: 100%;
    padding: 20px; /* Adjust as needed */
    z-index: 4;
    overflow-y: auto;
    font-family: 'Press Start 2P', cursive;
  }
  </style>
  