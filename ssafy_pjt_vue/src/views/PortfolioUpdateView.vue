<template>
  <div>
    <h1>Portfoli Update</h1>
    <form @submit.prevent="updatePortfolio">
      <label for="job">직업: </label>
      <select name="jobs" id="job" v-model.trim="job" required>
        <option disabled value="">옵션을 선택해주세요.</option>
        <option value="직장인">직장인</option>
        <option value="프리랜서">프리랜서</option>
        <option value="주부">주부</option>
        <option value="학생">학생</option>
        <option value="무직">무직</option>
      </select>
      <br>
      <label for="income">수입: </label>
      <input type="test" v-model.trim="income" id="income">
      <br>
      <label for="age">나이: </label>
      <input type="test" v-model.trim="age" id="age">
      <br>
      <label for="prefferedBank">선호 은행: </label>
      <select name="banks" id="prefferedBank" v-model.trim="prefferedBank" required>
        <option disabled value="">옵션을 선택해주세요.</option>
        <option value="국민은행">국민은행</option>
        <option value="우리은행">우리은행</option>
        <option value="신한은행">신한은행</option>
        <option value="하나은행">하나은행</option>
      </select>
      <br>
      <label for="investmentType">저축 성향: </label>
      <select name="types" id="investmentType" v-model.trim="investmentType" required>
        <option disabled value="">옵션을 선택해주세요.</option>
        <option value="알뜰형">알뜰형</option>
        <option value="도전형">도전형</option>
        <option value="성실형">성실형</option>
      </select>
      <br>
      <input type="submit" value="수정">
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user';
import axios from 'axios';

const userStore = useUserStore()
const router = useRouter()
const job = ref(userStore.portfolio.job)
const income = ref(userStore.portfolio.income)
const age = ref(userStore.portfolio.age)
const prefferedBank = ref(userStore.portfolio.preffered_bank)
const investmentType = ref(userStore.typeChange[userStore.portfolio.investment_type])

const updatePortfolio = function () {
  const payload = {
    job: job.value,
    income: income.value,
    age: age.value,
    preffered_bank: prefferedBank.value,
    investment_type: investmentType.value
  }
  userStore.updatePortfolio(payload)
}
</script>

<style scoped>

</style>