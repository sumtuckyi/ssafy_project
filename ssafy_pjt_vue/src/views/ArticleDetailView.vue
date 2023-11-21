<template>
  <div v-if="!(article === null)">
    <h1>{{ article.id }}번 게시글</h1>
    <p>{{ article.username }}</p>
    <p>{{ article.title }}</p>
    <p>{{ article.content }}</p>
    <p>{{ article.created_at }}</p>
    <p>{{ article.updated_at }}</p>
    <hr>
    <div v-if="userStore.user.pk === article.user">
      <RouterLink :to="{ name: 'articleupdate', params: { id: articleId }}">
        <button>수정하기</button>
      </RouterLink>
      <button @click="deleteArticle">삭제하기</button>
    </div>
    <div v-for="comment in article.articlecomment_set">
      <div v-if="comment.id !== commentEdit">
        <p>{{ comment.username }}</p>
        <p>{{ comment.content }}</p>
        <button 
          v-if="userStore.user.pk === comment.user"
          @click="clickEdit(comment)">수정</button>
        <button 
          v-if="userStore.user.pk === comment.user"
          @click="deleteComment(comment.id)">삭제</button>
      </div>
      <form v-else @submit.prevent="updateComment(comment.id)">
        <label for="edit">댓글:</label>
        <textarea v-model.trim="nowEditing" id="edit"></textarea>
        <input type="submit" value="수정">
      </form>
    </div>
    <br>
    <form v-if="userStore.isLogin" @submit.prevent="createComment">
      <label for="content">댓글:</label>
      <textarea v-model.trim="commentContent" id="content"></textarea>
      <input type="submit" value="등록">
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '../stores/article';
import { useUserStore } from '../stores/user';
import axios from 'axios';

const articleStore = useArticleStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const articleId = route.params.id
const article = ref(null)
const commentContent = ref('')
const commentEdit = ref(-1)
const nowEditing = ref('')

onMounted(() => {
  axios({
    method: 'get',
    url: `${userStore.API_URL}/articles/${articleId}/`
  })
    .then((res) => {
      article.value = res.data
    })
    .catch(err => console.log(err))
})

const deleteArticle = function () {
  axios({
    method: 'delete',
    url: `${userStore.API_URL}/articles/${articleId}/`,
    headers: {
      Authorization: `Token ${userStore.token}`
    }
  })
    .then((res) => {
      router.push({ name: 'articles' })
    })
    .catch(err => console.log(err))
}

const createComment = function () {
  axios({
    method: 'post',
    url: `${userStore.API_URL}/articles/${articleId}/comments/`,
    data: {
      content: commentContent.value,
    },
    headers: {
      Authorization: `Token ${userStore.token}`
    }
  })
    .then((res) => {
      router.go(0)
    })
    .catch((err) => {
      console.log(err)
    })
}

const deleteComment = function (id) {
  axios({
    method: 'delete',
    url: `${userStore.API_URL}/articles/${articleId}/comments/${id}/`,
    headers: {
      Authorization: `Token ${userStore.token}`
    }
  })
    .then((res) => {
      router.go(0)
    })
    .catch((err) => {
      console.log(err)
    })
}

const clickEdit = function (previous) {
  commentEdit.value = previous.id
  nowEditing.value = previous.content
}

const updateComment = function (id) {
  console.log(nowEditing.value)
  axios({
    method: 'put',
    url: `${userStore.API_URL}/articles/${articleId}/comments/${id}/`,
    data: {
      content: nowEditing.value
    },
    headers: {
      Authorization: `Token ${userStore.token}`
    }
  })
    .then((res) => {
      commentEdit.value = -1
      nowEditing.value = ''
      router.go(0)
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style scoped>

</style>