<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth'
const props = defineProps({
    blog: {
        type: Object,
        required: false
    },
    mode: {
      type: String,
      required: false
    }
});

const authStore = useAuthStore()
/**
 * props: {mode, blogData}
 * mode === 'update'
 * const {t,sd, c} = blogData;
 */
console.log({props})
const isEdit = props.mode === "update"
const title = ref(isEdit ? props.blog.title : '');
const shortDescription = ref(isEdit ? props.blog.shortDescription:'');
const content = ref(isEdit ?props.blog.content :'');

const handleSubmit = async() => {
    
  let token =  authStore.token
  let route = isEdit ? `/api/blog/${props.blog._id}` : '/api/blog';
  const blogData =  await $fetch(route,{
    method: (isEdit ? "PATCH":"POST"),
    body  : {title : title.value , shortDescription : shortDescription.value , content: content.value},
    headers: {
          Authorization: `Bearer ${token}`,
        },
  })
    
 
};
</script>

<template>
  <UCard class="w-full max-w-md">
    <h2 class="text-primary text-3xl font-bold text-center">Share some interesting content!</h2>

    <UForm class="space-y-4 mt-6 flex flex-col gap-2">
    
      <UInput v-model="title" type="text" placeholder="Title" required />

     
      <UInput v-model="shortDescription" type="text" placeholder="Short Description" required />

      
      <UTextarea v-model="content" placeholder="Content" rows="6" required />

      <UButton @click="handleSubmit" color="primary">
        Save
      </UButton>
    </UForm>
  </UCard>
</template>
