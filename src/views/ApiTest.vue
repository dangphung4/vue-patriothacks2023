<template>
  <div class="api-test">
    <h1>API Test Page</h1>
    <input v-model="category" placeholder="Enter category" />
    <button @click="fetchData">Fetch Data</button>
    <div id="map-container">
      <div id="map" style="width: 100%; height: 400px;"></div>
      <div v-if="googleMapsLoaded" id="grid-overlay"></div> <!-- Overlay for the grid -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const apiData = ref(null);
const category = ref('');
const googleMapsLoaded = ref(false); // Initialize as false

async function fetchData() {
  try {
    console.log('Fetching data...'); // Debug log
    const response = await axios.get(`http://localhost:8000/restaurants/${category.value}`);
    apiData.value = response.data;
    console.log('Data fetched:', apiData.value); // Debug log
    console.log('Number of restaurants fetched:', apiData.value.length); 
    loadMap(apiData.value);
  } catch (error) {
    console.error('Error fetching data:', error); // Debug log
  }
}

function loadMap(data) {
  console.log('Loading map...'); // Debug log
  const center = new google.maps.LatLng(38.8308, -77.3074); // George Mason University coordinates

  // 8-bit style array
  const retroStyle = [
    { "elementType": "geometry", "stylers": [{ "color": "#ebe3cd" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#523735" }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f1e6" }] },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [{ "color": "#c9b2a6" }]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [{ "color": "#dcd2be" }]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#ae9e90" }]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [{ "color": "#dfd2ae" }]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{ "color": "#dfd2ae" }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#93817c" }]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#a5b076" }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#447530" }]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{ "color": "#f5f1e6" }]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{ "color": "#fdfcf8" }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{ "color": "#f8c967" }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{ "color": "#e9bc62" }]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [{ "color": "#e98d58" }]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [{ "color": "#db8555" }]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#806b63" }]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [{ "color": "#dfd2ae" }]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#8f7d77" }]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#ebe3cd" }]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [{ "color": "#dfd2ae" }]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#b9d3c2" }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#92998d" }]
    }
];


  const mapOptions = {
    zoom: 14,
    center: center,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: retroStyle,  
  };

  const map = new google.maps.Map(document.getElementById('map'), mapOptions);

  console.log('Map loaded, adding markers...'); // Debug log
  data.forEach((restaurant, index) => {
    console.log('Adding marker for restaurant:', index, restaurant.name); // Debug log 

    const marker = new google.maps.Marker({
        position: { lat: restaurant.coordinates.latitude, lng: restaurant.coordinates.longitude },
        map: map,
        title: restaurant.name,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <h2>${restaurant.name}</h2>
        <p>${restaurant.address}</p>
        <p>Rating: ${restaurant.rating}</p>
        <img src="${restaurant.image_url}" alt="${restaurant.name}" width="100" />
        <a href="${restaurant.official_site_url}" target="_blank">Visit Website</a>
      `,
    });

    marker.addListener('click', () => {
      infoWindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });
  });
  console.log('Markers added.'); // Debug log

  googleMapsLoaded.value = true;
}

onMounted(() => {
  console.log('Component mounted.'); // Debug log
  if (!window.google) {
    console.log('Loading Google Maps script...'); // Debug log
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBDY43SlD_g6ZsYG1ntioIgzQUx_Z0dR_I`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('Google Maps script loaded.'); // Debug log
      addGridOverlay();
    };
    document.body.appendChild(script);
  }
});

function addGridOverlay() {
  const gridOverlay = document.getElementById('grid-overlay');
  gridOverlay.style.width = '100%';
  gridOverlay.style.height = '100%';
  gridOverlay.style.position = 'absolute';
  gridOverlay.style.top = '0';
  gridOverlay.style.left = '0';
  gridOverlay.style.backgroundImage = 'url(./.grid.png)'; 
  gridOverlay.style.backgroundSize = '400px 400px'; 
  gridOverlay.style.pointerEvents = 'none'; 
  gridOverlay.style.zIndex = '1000'; 
}
</script>

<style scoped>
.api-test {
  text-align: center;
  margin-top: 50px;
}

/* Style for the map container */
#map-container {
  width: 100%;
  height: 400px;
  position: relative;
}

/* Style for the map */
#map {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0; /* Set a lower z-index for the map */
}

/* Style for the grid overlay */
#grid-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(grid.png); /* Set the path to your grid image */
  background-size: 150px 150px; /* Adjust grid size to match your image */
  pointer-events: none; /* Ensure it doesn't interfere with map interaction */
  z-index: 1; /* Set a higher z-index for the grid overlay */
  opacity: 1; 
}
</style>