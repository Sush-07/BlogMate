<template>
    <UContainer class="flex items-center justify-center min-h-screen">
      <UCard class="w-full max-w-md">
        <h2 class="text-primary text-3xl font-bold text-center">Signup to Blog Mate</h2>
        <p class="text-secondary text-center mt-2">Welcome to Blog Mate</p>
  
        <UForm class="space-y-4 mt-6 flex flex-col gap-2">
          <UInput v-model="username" type="text" placeholder="UserName"  />
          <UInput v-model="email" type="email" placeholder="Email"  />
          <UInput v-model="password" type="password" placeholder="Password"  />
  
          <UButton  @click="handleSignup" color="primary">
            Signup
          </UButton>
        </UForm>
        <p class="text-secondary text-center mt-4">
          Already have an account?
          <NuxtLink to="/login" class="text-primary font-medium">Login</NuxtLink>
        </p>
      </UCard>
    </UContainer>
  </template>

<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';


definePageMeta({
  layout: 'auth',
});

const authStore = useAuthStore();

const username = ref('');
const email = ref('');
const password = ref('');
const loading = ref(false);

watch(()=> authStore.user,async()=>{
    if(authStore.user)
{
    await navigateTo("/")
}
})
const handleSignup = async () => {
   
  loading.value = true;

  try {
   
    const response = await $fetch('/api/signup', {
      method: 'POST',
      body: {
        name: username.value,
        email: email.value,
        password: password.value,
      },
    });

    authStore.setAuthData({
      token: response.token,
      user: response.user,
    });
  } catch (err) {
    console.log('Error:', err);
  } finally {
    loading.value = false;
  }
};
</script>

  