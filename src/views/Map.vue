<template>
    <div class="map-page">
        
      <img src="/darkmap.png" alt="Map" class="map" />
      <div 
        v-for="restaurant in restaurants" 
        :key="restaurant._id" 
        :style="{top: restaurant.position.y + 'px', left: restaurant.position.x + 'px'}" 
        class="pin"
        @click="moveSpriteToPin(restaurant)"
      ></div>
      <img :style="{top: spriteY + 'px', left: spriteX + 'px'}" src="/greensprite.gif" alt="Sprite" class="sprite"/>
      
      <transition name="fade">
      <div v-if="selectedRestaurant && !isMoving" class="info">
    <div class="info-content">
        <h2>{{ selectedRestaurant.name }}</h2>
        <p>{{ selectedRestaurant.address }}</p>
        <img :src="selectedRestaurant.image_url" alt="Restaurant Image" class="info-img" />
        <p>Rating: {{ selectedRestaurant.rating }}</p>
        <button @click="closeInfo">Close</button>
        <a v-if="selectedRestaurant?.official_site_url" :href="selectedRestaurant?.official_site_url" target="_blank" rel="noopener noreferrer" class="website-link">Visit Website</a>
    </div>
</div>
</transition>

<transition name="fade">
<div v-if="recommendations.length && !isMoving" class="recommendations">
    <h3 style="color: white;">Recommendations</h3>
    <div class="rec-container">
        <div 
            v-for="recommendation in recommendations" 
            :key="recommendation._id" 
            class="recommendation"
        >
            <h4>{{ recommendation.name }}</h4>
            <img :src="recommendation.image_url" alt="Restaurant Image" class="rec-img" />
            <p>{{ recommendation.address }}</p>
            <p>Rating: {{ recommendation.rating }}</p>
            <a v-if="recommendation?.official_site_url" :href="recommendation?.official_site_url" target="_blank" rel="noopener noreferrer" class="website-link">Visit Website</a>

        </div>
    </div>
</div>
</transition>

</div>
</template>

  
<script setup>
import { ref, onMounted } from 'vue';

const restaurants = ref([]);
const selectedRestaurant = ref(null);
const spriteX = ref(500); // Initial position
const spriteY = ref(300); // Initial position
const isMoving = ref(false);

const location = ref('George Mason');
const recommendations = ref([]); 

const logUrl = (url) => {
    console.log('Attempting to open URL:', url);
};

const calculatePositioning = () => {
    const mapElement = document.querySelector('.map');
    const mapHeight = mapElement.offsetHeight;
    const mapWidth = mapElement.offsetWidth;

    restaurants.value.forEach(restaurant => {
        restaurant.position = {
            x: Math.random() * mapWidth,
            y: Math.random() * mapHeight
        };
    });
};

onMounted(async () => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/restaurants/${location.value}`);
        if (response.ok) {
            const allRestaurants = await response.json();
            restaurants.value = allRestaurants.slice(0, 30);
        } else {
            console.error('Failed to fetch restaurants');
        }
    } catch (error) {
        console.error('Error:', error);
    }
    calculatePositioning();
});

const convertLatToY = (latitude) => {
    const mapElement = document.querySelector('.map');
    const mapHeight = mapElement.offsetHeight;
    return (((latitude - 38) * 1500) % mapHeight);
};

const convertLonToX = (longitude) => {
    const mapElement = document.querySelector('.map');
    const mapWidth = mapElement.offsetWidth;
    return (((longitude + 77) * 3000) % mapWidth);
};

const infoPosition = ref({
    x: 0,
    y: 0
});

const moveSpriteToPin = async (restaurant) => {
    selectedRestaurant.value = restaurant;
    const x = restaurant.position.x;
    const y = restaurant.position.y;
    spriteX.value = x;
    spriteY.value = y;
    infoPosition.x = x; // Set popup x position
    infoPosition.y = y - 70; // Set popup y position above the sprite
    isMoving.value = true;

    // New - Fetch recommendations
    try {
        const response = await fetch(`http://127.0.0.1:8000/recommendations/${encodeURIComponent(restaurant.name)}`);
        if (response.ok) {
            recommendations.value = await response.json(); // Corrected this line to update the recommendations variable
            recommendations.value = recommendations.value.filter(
                (rec, index, self) =>
                    index === self.findIndex(r => r.name === rec.name)  // Filter out duplicates by name
            );
        } else {
            console.error('Failed to fetch recommendations');
        }
    } catch (error) {
        console.error('Error:', error);
    }

    setTimeout(() => {
        isMoving.value = false;
    }, 2000);
};

const closeInfo = () => {
    selectedRestaurant.value = null;
    recommendations.value = [];
};
</script>
  
<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
}
/* Reset some styles for a cleaner look */
body, h2, h3, h4, p {
    margin: 0;
    padding: 0;
}

/* Styles for the map */
.map-page {
    position: relative;
    overflow: hidden; /* Prevent overflow of child elements */
}

.map {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    display: block;
}

/* Styles for the pins on the map */
.pin {
    position: absolute;
    width: 60px;
    height: 60px;
    background: url('/pin.png') no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    transform: translateY(-100%);
}

/* Styles for the sprite */
.sprite {
    position: absolute;
    width: 64px;
    height: auto;
    transition: top 2s linear, left 2s linear;
}
.website-link {
    display: inline-block;
    margin-top: 8px;
    padding: 6px 12px;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    border-radius: 4px;
    transition: background-color 0.3s;
    text-decoration: none;
    text-align: center;
    font-size: 12px;
}

.website-link:hover {
    background-color: rgba(255, 255, 255, 0.2);
}
/* Styles for the main popup */
.info, .recommendation {
    background-color: rgba(0, 0, 0, 0.8);
    border: 1px solid #fff;
    border-radius: 4px;
    color: #fff;
    padding: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    
}

.info {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 300px;
    background-color: rgba(0, 0, 0, 0.9); /* Changed to dark background */
    border-radius: 5px;
    padding: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.5); /* Updated shadow for better visibility on dark theme */
    z-index: 10;
}

.info-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    
}

.info h2 {
    margin: 0;
    font-size: 16px;
    color: #ffffff;
}

.info p {
    margin: 4px 0;
    font-size: 15px;
    color: #fff;
}
button, .website-link {
    transition: all 0.3s ease;
}

.info-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
    margin-top: 8px;
}

.recommendations {
    position: fixed;
    top: 70%;
    left: 50%;
    transform: translateX(-50%);
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.rec-container {
    display: flex;
    gap: 10px;
    overflow: auto;
}

.recommendation {
    width: 200px;
    background-color: rgba(0, 0, 0, 0.9); /* Changed to dark background */
    border: 1px solid rgba(255,255,255,0.1); /* Changed border color for dark theme */
    border-radius: 15px;
    padding: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.5); /* Updated shadow for better visibility on dark theme */
    color: #FFF; /* Changed to white text */
}

.rec-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
}

button {
    margin-top: 12px;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    background-color: #4285F4;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #34A853;
}
</style>
  