<template>
  <div>
    <h1>Review Update</h1>
    <form @submit.prevent="updateReview">
      <div>
        <label for="title">제목:</label>
        <input type="text" v-model.trim="title" id="title">
      </div>
      <div>
        <label for="content">내용:</label>
        <textarea v-model.trim="content" id="content"></textarea>
      </div>
      <input type="submit" value="수정">
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useReviewStore } from '../stores/review';
import { useUserStore } from '../stores/user';
import axios from 'axios';

const reviewStore = useReviewStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const reviewId = route.params.id
const title = ref('')
const content = ref('')

onMounted(() => {
  axios({
    method: 'get',
    url: `${userStore.API_URL}/reviews/${reviewId}/`
  })
  .then((res) => {
    title.value = res.data.title
    content.value = res.data.content
  })
  .catch(err => console.log(err))
})

const updateReview = function () {
  axios({
    method: 'put',
    url: `${userStore.API_URL}/reviews/${reviewId}/`,
    data: {
      title: title.value,
      content: content.value,
    },
    headers: {
      Authorization: `Token ${userStore.token}`
    }
  })
    .then((res) => {
      router.push({ name: 'reviewdetail', params: { id: reviewId } })
    })
    .catch((err) => {
      console.log(err)
    })
}

</script>

<style scoped>

</style>