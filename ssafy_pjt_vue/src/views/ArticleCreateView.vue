<template>
  <div>
    <h1>Article Create</h1>
    <form @submit.prevent="createArticle">
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
import { useArticleStore } from '../stores/article';
import { useUserStore } from '../stores/user';
import axios from 'axios';

const articleStore = useArticleStore()
const userStore = useUserStore()
const router = useRouter()
const title = ref('')
const content = ref('')

const createArticle = function () {
  axios({
    method: 'post',
    url: `${userStore.API_URL}/articles/`,
    data: {
      title: title.value,
      content: content.value,
    },
    headers: {
      Authorization: `Token ${userStore.token}`
    }
  })
    .then((res) => {
      router.push({ name: 'articles' })
    })
    .catch((err) => {
      console.log(err)
    })
}

</script>

<style scoped>

</style>