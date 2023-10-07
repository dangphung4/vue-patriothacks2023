<template>
    <div id="map" style="width: 100%; height: 400px;"></div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  
  const map = ref(null);
  
  onMounted(() => {
    const mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(38.8318, -77.2888), // George Mason University coordinates
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
  
    map.value = new google.maps.Map(document.getElementById('map'), mapOptions);
  
    // Add markers based on restaurant data fetched from the API
    // For demo, adding a single marker at George Mason University
    new google.maps.Marker({
      position: { lat: 38.8318, lng: -77.2888 },
      map: map.value,
      title: 'George Mason University',
    });
  });
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  