<template>
  <div>
    <h1>Password Change</h1>
    <form @submit.prevent="changePassword" class="form-list">
      <div class="form-item">
        <input class="input" type="password" placeholder="기존 비밀번호" v-model.trim="oldPassword">
      </div>
      <div class="form-item">
        <input class="input" type="password" placeholder="새 비밀번호" v-model.trim="newPassword1">
      </div>
      <div class="form-item last">
        <input class="input" type="password" placeholder="새 비밀번호 확인" v-model.trim="newPassword2">
      </div>
      <button @click="submit">비밀번호 변경</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const oldPassword = ref(null)
const newPassword1 = ref(null)
const newPassword2 = ref(null)

const changePassword = function () {
  const payload = {
    old_password: oldPassword.value,
    new_password1: newPassword1.value,
    new_password2: newPassword2.value
  }
  userStore.passwordChange(payload)
}

</script>

<style scoped>
.form-list {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 100px;
}
.form-item {
  margin-top: -2px;
}
.input {
  width: 50%;
  height: 50px;
  font-size: 25px;
}
.last {
  margin-bottom: 30px;
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
  font-size: 20px;
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