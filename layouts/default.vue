<template>
    <div class="min-h-screen flex flex-col">
      <Navbar />
  
      <main class="flex-1 container mx-auto px-4 py-6">
        <slot />
      </main>
  
      <footer class="bg-gray-100 text-center py-4">
        © {{ new Date().getFullYear() }} Blog Mate. All rights reserved.
      </footer>
    </div>
  </template>
  
  <script setup>
  import Navbar from '~/components/Navbar.vue';
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  </style>
  