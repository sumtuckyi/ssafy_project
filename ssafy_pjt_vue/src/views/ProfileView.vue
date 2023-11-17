<template>
  <div>
    <RouterLink 
      :to="{ name: 'portfoliocreate' }"
      v-if="!userStore.pfExist">Portfolio Create</RouterLink>
    <RouterLink v-else :to="{ name: 'portfoliodetail' }">Portfolio</RouterLink>
    <p>PK: {{ userStore.user.pk }}</p>
    <p>아이디: {{ userStore.user.username }}</p>
    <p>이메일: {{ userStore.user.email }}</p>
    <p>이름: {{ userStore.user.last_name+userStore.user.first_name }}</p>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<style scoped>

</style>