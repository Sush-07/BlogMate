<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(async () => {
  let token = localStorage.getItem("token");
  if (token) {
    try {
      const {user} = await $fetch("/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      authStore.setAuthData({user,token});
      
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }
});
</script>
<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </UApp>
</template>
