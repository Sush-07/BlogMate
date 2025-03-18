<template>
    <UContainer class="flex items-center justify-center min-h-screen">
        <UCard class="w-full max-w-md">
            <h2 class="text-primary text-3xl font-bold text-center">Login to Blog Mate</h2>
            <p class="text-secondary text-center mt-2">Welcome back! Please sign in to continue.</p>

            <UForm class="space-y-4 mt-6 flex flex-col gap-2" >
                <UInput  v-model="email" type="email" placeholder="Email"  />
                <UInput  v-model="password" type="password" placeholder="Password"  />

                <UButton @click="handleLogin"color="primary">
                    Login
                </UButton>
            </UForm>

            <p class="text-secondary text-center mt-4">
                Don't have an account?
                <NuxtLink to="/signup" class="text-primary font-medium">Sign up</NuxtLink>
            </p>
        </UCard>
    </UContainer>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth'

definePageMeta({
    layout: 'auth' 
});

const authStore = useAuthStore()

const email = ref('');
const password = ref('');
const loading = ref(false);

watch(() => authStore.user,async() => {
    if(authStore.user) {await navigateTo('/')}
})

const handleLogin = async () => {
    loading.value = true;

    try {
        const response = await $fetch('/api/login', {
            method: 'POST',
            body: { email: email.value, password: password.value }
        });
        
        authStore.setAuthData({
            token: response.token,
            user: response.user
        })
    } catch (error) {
        console.error('Login Failed:', error);
    } finally {
        loading.value = false;
    }
};
</script>