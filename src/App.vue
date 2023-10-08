<script setup>
</script>

<template>
  <div id="app">
<!-- 
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">  <router-link to="/" class="nav-link">My Vue App</router-link></a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/test" class="nav-link">API TEST</router-link>
            </li>
         
        </ul>
      </div>
    </nav> -->
    <router-view />
  </div>
</template>



<style scoped>
.display-4 {
  color: #007bff;
}

.lead {
  color: #868e96;
}

.btn-primary {
  background-color: #007bff;
  border: none;
}


</style>
