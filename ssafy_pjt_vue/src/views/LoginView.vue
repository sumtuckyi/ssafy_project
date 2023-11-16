<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="logIn">
      <label for="username">username: </label>
      <input type="text" id="username" v-model.trim="username">
      <br>
      <label for="password">password: </label>
      <input type="password" id="password" v-model.trim="password">
      <br>
      <input type="submit">
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user';

const userStore = useUserStore()
const username = ref(null)
const password = ref(null)

const logIn = function () {
  const payload = {
    username: username.value,
    password: password.value
  }
  userStore.logIn(payload)
}
</script>

<style>

</style>
