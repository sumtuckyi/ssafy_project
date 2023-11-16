<template>
  <div>
    <h1>Signup</h1>
    <form @submit.prevent="signUp">
      <label for="username">username: </label>
      <input type="text" id="username" v-model.trim="username">
      <br>
      <label for="email">email: </label>
      <input type="text" id="email" v-model.trim="email">
      <br>
      <label for="password1">password: </label>
      <input type="password" id="password1" v-model.trim="password1">
      <br>
      <label for="password2">confirm: </label>
      <input type="password" id="password2" v-model.trim="password2">
      <br>
      <label for="firstname">firstname: </label>
      <input type="text" id="firstname" v-model.trim="firstname">
      <br>
      <label for="lastname">lastname: </label>
      <input type="text" id="lastname" v-model.trim="lastname">
      <br>
      <input type="submit">
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const username = ref(null)
const password1 = ref(null)
const password2 = ref(null)
const email = ref(null)
const firstname = ref(null)
const lastname = ref(null)

const signUp = function () {
  const payload = {
    username: username.value,
    password1: password1.value,
    password2: password2.value,
    email: email.value,
    first_name: firstname.value,
    last_name: lastname.value
  }
  userStore.signUp(payload)
}


</script>

<style>

</style>
