<template>
    <UContainer class="flex justify-between items-center py-4 w-full">
        <NuxtLink to="/" class="text-primary text-2xl font-bold">Blog Mate</NuxtLink>

        <div class="flex items-center gap-4">
            <NuxtLink v-if="authStore.user" to="/blog/new" class="text-secondary hover:text-primary">Create New Blog</NuxtLink> 
            <p v-if="authStore.user">Hii {{ authStore.user.name}}</p>
            <UButton v-if="!authStore.user" to="/login" color="primary" variant="solid">Login</UButton>
            <UButton @click="authStore.clearAuthData" v-if ="authStore.user">LOGOUT</UButton>
           
        </div>
    </UContainer>
</template>

<script setup >
import {  watch } from 'vue'
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
</script>
