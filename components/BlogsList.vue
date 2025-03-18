<script setup>
defineProps({
    blogs: {
        type: Array,
        required: true
    }
});
</script>

<template>
  <div>

    <div v-if="blogs.length">
      <div v-for="blog in blogs" :key="blog._id" class="blog-card">
        <h2>{{ blog.title }}</h2>
        <p>{{ blog.shortDescription }}</p>
        <NuxtLink :to="`/blog/${blog._id}`">Read more...</NuxtLink>
      </div>
    </div>

    <div v-else>
      <p>{{ blogs }}</p>
      <p>No blogs available.</p>
    </div>
  </div>
</template>

<style scoped>
.blog-card {
    border: 1px solid #e0e0e0;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    background-color: #fafafa;
}
</style>
