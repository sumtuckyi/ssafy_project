<template>
  <div>
    {{ userStore.user }}
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<style scoped>

</style>