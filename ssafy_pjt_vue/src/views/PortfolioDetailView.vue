<template>
  <div>
    <h1>Portfolio</h1>
    <p>직업: {{ userStore.portfolio.job }}</p>
    <p>수입: {{ userStore.portfolio.income }}</p>
    <p>나이: {{ userStore.portfolio.age }}</p>
    <p>선호 은행: {{ userStore.portfolio.preffered_bank }}</p>
    <p>저축 성향: {{ userStore.typeChange[userStore.portfolio.investment_type] }}</p>
    <hr>
    <RouterLink :to="{ name: 'portfolioupdate' }">
      <button>수정하기</button>
    </RouterLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user';
import axios from 'axios';

const userStore = useUserStore()
</script>

<style scoped>

</style>