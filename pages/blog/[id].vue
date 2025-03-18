<script setup async>
import SingleBlog from '~/components/SingleBlog.vue';

const route = useRoute();
const { data, error, pending } = await useFetch(`/api/blog/${route.params.id}`);
const blog = data?.value?.blog;
if (error.value) {
    console.error('Error fetching blog:', error.value);
}
</script>

<template>
  <div>
    <div v-if="pending">Loading...</div>
    <SingleBlog v-else-if="blog" :blog="blog" />
    <p v-else>Blog not found.</p>
  </div>
</template>
