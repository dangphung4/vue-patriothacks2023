<script setup>
</script>

<template>
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
    <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>



<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}.display-4 {
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
