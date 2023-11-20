<template>
  <div>
    <h1>Article</h1>
    <RouterLink :to="{ name: 'articlecreate' }">
      [Article Create]
    </RouterLink>
    <hr>
    <label for="search">검색: </label>
    <input type="text" id="search" v-model="search">
    <button @click="searchArticles">검색하기</button>
    <div v-for="article in articles.slice((currentPage - 1) * perPage, currentPage * perPage)">
      <p>{{ article.id }}</p>
      <RouterLink 
        :to="{ name: 'articledetail', params: { id: article.id } }"
      >
        {{ article.title }}
      </RouterLink>
      <hr>
    </div>
    <ul class="pagination">
      <li v-for="page in pages" @click="changePage(page)"><button>{{ page }}</button></li>
    </ul>
  </div>
</template>

<script setup>
import { useArticleStore } from '../stores/article';
import { useUserStore } from '../stores/user';
import { onMounted, ref, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const articleStore = useArticleStore()
const articles = ref([])
const search = ref('')
const pages = computed(() => {
  return Array.from({length: Math.ceil(articles.value.length / perPage.value)}, (v, i) => i + 1)
})
const perPage = ref(10)
const currentPage = ref(1)

const changePage = (page) => {
  currentPage.value = page
}

onMounted(() => {
  articleStore.getArticles()
  articles.value = articleStore.articles
})

const searchArticles = () => {
  articles.value = articleStore.articles
  const searchResult = articles.value.filter((article) => 
    article.title.includes(search.value) || article.content.includes(search.value)
  )
  articles.value = searchResult
}
</script>

<style scoped>
.pagination {
  display: flex;
  list-style: none;
}
</style>