<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const title = ref('');
const shortDescription = ref('');
const content = ref('');

const handleSubmit = async() => {
    
  let token =  authStore.token
  const blogData =  await $fetch("/api/blog",{
    method: "POST",
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
