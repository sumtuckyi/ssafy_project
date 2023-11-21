<template>
  <div>
    <h1>Password Change</h1>
    <form @submit.prevent="changePassword">
      <label for="oldPassword">old_password: </label>
      <input type="password" id="oldPassword" v-model.trim="oldPassword">
      <br>
      <label for="newPassword1">password: </label>
      <input type="password" id="newPassword1" v-model.trim="newPassword1">
      <br>
      <label for="newPassword2">confirm: </label>
      <input type="password" id="newPassword2" v-model.trim="newPassword2">
      <br>
      <input type="submit" value="수정">
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

</style>