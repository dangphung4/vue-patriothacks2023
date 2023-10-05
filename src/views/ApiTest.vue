<template>
    <div class="api-test">
      <h1>API Test Page</h1>
      <button @click="fetchData">Fetch Data</button>
      <ApiData :data="apiData" v-if="apiData" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import ApiData from '../components/ApiData.vue';
  
  export default {
    data() {
      return {
        apiData: null
      };
    },
    components: {
      ApiData
    },
    methods: {
      async fetchData() {
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/users/');
          this.apiData = response.data;
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .api-test {
    text-align: center;
    margin-top: 50px;
  }
  </style>
  