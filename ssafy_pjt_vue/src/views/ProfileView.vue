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
    <RouterLink :to="{ name: 'profileupdate'}">
      <button>회원정보 수정</button>
    </RouterLink>
    <RouterLink :to="{ name: 'passwordchange'}">
      <button>비밀변호 변경</button>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<style scoped>

</style>