<template>
  <div>
    <h1>Article</h1>
    <RouterLink :to="{ name: 'articlecreate' }">
      [Article Create]
    </RouterLink>
    <div v-for="article in articleStore.articles">
      <p>{{ article.id }}</p>
      <RouterLink 
        :to="{ name: 'articledetail', params: { id: article.id } }"
      >
        {{ article.title }}
      </RouterLink>
      <hr>
    </div>
  </div>
</template>

<script setup>
import { useArticleStore } from '../stores/article';
import { useUserStore } from '../stores/user';
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const articleStore = useArticleStore()
const userStore = useUserStore()
onMounted(() => {
  articleStore.getArticles()
})
</script>

<style scoped>

</style>