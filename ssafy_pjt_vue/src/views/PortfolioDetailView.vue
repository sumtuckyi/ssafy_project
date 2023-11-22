<template>
  <div>
    <div class="portfolio-container">
      <form class="form-list">
        <div class="form-item">
          <p>직업:</p>
          <p>수입:</p>
          <p>나이:</p>
          <p>선호 은행:</p>
          <p>저축 성향:</p>
        </div>
        <div class="form-item">
          <p>{{ userStore.portfolio.job }}</p>
          <p>{{ userStore.portfolio.income }}</p>
          <p>{{ userStore.portfolio.age }}</p>
          <p>{{ userStore.portfolio.preffered_bank }}</p>
          <p>{{ userStore.typeChange[userStore.portfolio.investment_type] }}</p>
        </div>
      </form>
      <div>
        <RouterLink :to="{ name: 'portfolioupdate' }">
          <button>수정하기</button>
        </RouterLink>
      </div>
    </div>
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
.portfolio-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
}
.form-list {
  display: flex;
  margin-top: 50px;
  margin-bottom: 100px;
}
.form-item {
  height: 130px;
  font-size: 25px;
  margin-right: 50px;
}
button {
  appearance: none;
  background-color: #FAFBFC;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292E;
  cursor: pointer;
  display: inline-block;
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  padding: 6px 16px;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
}

button:hover {
  background-color: #F3F4F6;
  text-decoration: none;
  transition-duration: 0.1s;
}

button:disabled {
  background-color: #FAFBFC;
  border-color: rgba(27, 31, 35, 0.15);
  color: #959DA5;
  cursor: default;
}

button:active {
  background-color: #EDEFF2;
  box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
  transition: none 0s;
}

button:focus {
  outline: 1px transparent;
}

button:before {
  display: none;
}

button:-webkit-details-marker {
  display: none;
}
</style>