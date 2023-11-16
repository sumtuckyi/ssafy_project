<template>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/articles">Articles</RouterLink>
      <RouterLink to="/reviews">Reviews</RouterLink>
      <RouterLink 
        v-if="!userStore.isLogin" 
        :to="{ name: 'login' }">Login</RouterLink>
      <RouterLink 
        v-if="!userStore.isLogin" 
        :to="{ name: 'signup' }">SignUp</RouterLink>
      <a @click="userStore.logOut" v-if="userStore.isLogin">Logout</a>
    </nav>
    <p v-if="userStore.isLogin">{{ userStore.user.pk }}님 안녕하세요!</p>
    <RouterLink :to="{ name: 'profile' }">Profile</RouterLink>
  </div>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-evenly;
}
</style>
