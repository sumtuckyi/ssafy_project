<template>
  <div>
    <h1>Article Update</h1>
    <form @submit.prevent="updateArticle">
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
import { useArticleStore } from '../stores/article';
import { useUserStore } from '../stores/user';
import axios from 'axios';

const articleStore = useArticleStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const articleId = route.params.id
const title = ref('')
const content = ref('')

onMounted(() => {
  axios({
    method: 'get',
    url: `${userStore.API_URL}/articles/${articleId}/`
  })
  .then((res) => {
    title.value = res.data.title
    content.value = res.data.content
  })
  .catch(err => console.log(err))
})

const updateArticle = function () {
  axios({
    method: 'put',
    url: `${userStore.API_URL}/articles/${articleId}/`,
    data: {
      title: title.value,
      content: content.value,
    },
    headers: {
      Authorization: `Token ${userStore.token}`
    }
  })
    .then((res) => {
      router.push({ name: 'articledetail', params: { id: articleId } })
    })
    .catch((err) => {
      console.log(err)
    })
}

</script>

<style scoped>

</style>