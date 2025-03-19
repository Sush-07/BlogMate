<script setup>
import { useAuthStore } from '@/stores/auth'
defineProps({
    blog: {
        type: Object,
        required: true
    }
});
const authStore = useAuthStore()
</script>

<template>
  <div class="blog-container">
    <h1 class="text-3xl font-bold">{{ blog.title }}</h1>
    <p class="text-gray-500 text-sm mt-1">Published on {{ new Date(blog.createdAt).toLocaleDateString() }}</p>
    <div class="content mt-4" v-html="blog.shortDescription"></div>
    <div class="content mt-4" v-html="blog.content"></div>

    <div class="tags mt-4">
      <span v-for="tag in blog.tags" :key="tag" class="tag">{{ tag }}</span>
      <NuxtLink v-if ="authStore.user._id == blog.author.id" :to="`/blog/edit/${blog._id}`">EDIT</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.blog-container {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.content {
    line-height: 1.8;
    color: #333;
}
.tag {
    background-color: #e2e8f0;
    color: #4a5568;
    padding: 4px 8px;
    border-radius: 16px;
    margin-right: 4px;
    font-size: 0.875rem;
}
</style>
