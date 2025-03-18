<script setup async>
import BlogsList from '~/components/BlogsList.vue';

const { data } = await useFetch('/api/blog', { server: true })
const blogs = data.value?.blogs || [];


</script>
<template>
    <UContainer>
      <UCard>
        <h1 class="text-primary text-3xl font-bold">Welcome to Blog Mate</h1>
        <p class="text-secondary mt-2">
          Your go-to platform for sharing amazing content!
        </p>
        <BlogsList :blogs="blogs" />
      </UCard>
    </UContainer>
  </template>
  