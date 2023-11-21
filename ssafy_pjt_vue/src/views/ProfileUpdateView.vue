<template>
  <div>
    <h1>Profile Update</h1>
    <form @submit.prevent="updateProfile">
      <label for="email">email: </label>
      <input type="text" id="email" v-model.trim="email">
      <br>
      <label for="firstname">firstname: </label>
      <input type="text" id="firstname" v-model.trim="firstname">
      <br>
      <label for="lastname">lastname: </label>
      <input type="text" id="lastname" v-model.trim="lastname">
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
const email = ref(userStore.user.email)
const firstname = ref(userStore.user.first_name)
const lastname = ref(userStore.user.last_name)

const updateProfile = function () {
  const payload = {
    email: email.value,
    first_name: firstname.value,
    last_name: lastname.value
  }
  userStore.profileUpdate(payload)
}
</script>

<style scoped>

</style>