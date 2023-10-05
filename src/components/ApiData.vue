<template>
    <div class="api-data">
      <h2>Data from API:</h2>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: Object
    }
  };
  </script>
  
  <style scoped>
  .api-data {
    text-align: left;
    margin: 20px;
    padding: 10px;
    border: 1px solid #ccc;
  }
  </style>
  