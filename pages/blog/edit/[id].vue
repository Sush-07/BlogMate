<script setup async>
    import BlogEdit from "~/components/BlogEdit.vue"
const route = useRoute();

    const { data, error, pending } = await useFetch(`/api/blog/${route.params.id}`);
    const blog = data?.value?.blog
    /**
     * if error redirect to /blog/new
     * else const blog = data?.value?.blog
     */
</script>
<template>
    <UContainer class="flex items-center justify-center min-h-screen">
        <BlogEdit :mode="'update'" :blog="blog"/>
    </UContainer>
</template>
