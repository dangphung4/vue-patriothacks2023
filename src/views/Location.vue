<template>
    <div class="location-page">
      <img src="/BTMdark.png" alt="Background" class="background" />
      <img src="/curse.gif" alt="sprite" class="sprite" style="width: 30%; left: 35%; top:35%;" />
      <img src="/moon.png" alt="moon" class="moon" />
      <div class="input-container">
        <img src="/whitetextbox.png" alt="White Text Box" class="enter-location" />
        <img src="/playbutton.png" alt="play button" class="play-button" @click="goToMap" />
        <img src="/locationtext.png" alt="location text" class="box-text" />
        <input 
        type="text" 
        v-model="location" 
        class="location-input" 
        placeholder="Enter location"
        @keyup.enter="goToMap"
      />
      </div>
      <SettingsNavbar />
    </div>
  </template>
  
  <script setup>
  import SettingsNavbar from '@/components/SettingsNavbar.vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const location = ref('');
  const router = useRouter();
  
  const goToMap = () => {
    // you can pass the location to the map page or do something else with it
    router.push('/map');
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100;0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;0,9..40,1000;1,9..40,100;1,9..40,200;1,9..40,300;1,9..40,400;1,9..40,500;1,9..40,600;1,9..40,700;1,9..40,800;1,9..40,900;1,9..40,1000&family=VT323&display=swap');

*{
  font-family: "VT323";
}
  .location-page {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.location-input {
    position: absolute;
    top: 90%;  
    left: 10%; 
    width: 50%; 
    height: 10%; 
    border: 1px solid black; 
    background-color: white; 
    color: black; 
    padding: 10px;
    font-family: "VT323";
    font-size: 20px; 
    z-index: 5; 
}
.background {
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 1;
  object-fit: cover;
}
.moon {
    position: absolute;
    z-index: 3;
    width : 10%;
    left: 10%;
    top: 15%;
    transform: translateX(-50%);
}
.sprite {
  position: absolute;
  width: 100px; 
  z-index: 2;
  bottom: 20%; 
  left: 50%;
  transform: translateX(-50%);
}

.input-container {
  position: absolute;
  z-index: 3;
  top: 40%;
  left: 60%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.enter-location{
    width : 100%;
    top : 50%;
    
    
}
.play-button{
    position: absolute;
    width : 8%;
    left: 6%;
    top : 30%;
}

.box-text{
    position: absolute;
    left : 15%;
    width : 80%;
    top : 32%;
}
.location-input {
  padding: 10px;
  font-size: 18px;
  margin-bottom: 20px; 
}

.go-button {
  padding: 10px 20px;
  background-color: #000; 
  color: #fff;
  border: none;
  cursor: pointer;
  text-decoration: none;
}
</style>
  