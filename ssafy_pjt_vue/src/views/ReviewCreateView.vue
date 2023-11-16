<template>
  <div>
    <h1>Review Create</h1>
    <form @submit.prevent="createReview">
      <div>
        <label for="title">제목:</label>
        <input type="text" v-model.trim="title" id="title">
      </div>
      <div>
        <label for="content">내용:</label>
        <textarea v-model.trim="content" id="content"></textarea>
      </div>
      <input type="submit">
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useReviewStore } from '../stores/review';
import { useUserStore } from '../stores/user';
import axios from 'axios';

const reviewStore = useReviewStore()
const userStore = useUserStore()
const router = useRouter()
const title = ref('')
const content = ref('')

const createReview = function () {
  axios({
    method: 'post',
    url: `${userStore.API_URL}/reviews/`,
    data: {
      title: title.value,
      content: content.value,
    },
    headers: {
      Authorization: `Token ${userStore.token}`
    }
  })
    .then((res) => {
      router.push({ name: 'reviews' })
    })
    .catch((err) => {
      console.log(err)
    })
}

</script>

<style scoped>

</style>