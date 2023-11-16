<template>
  <div>
    {{ userStore.user }}
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
</script>

<style scoped>

</style>