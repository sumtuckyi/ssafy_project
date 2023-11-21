<template>
  <div>
    <h1>Article</h1>
    <RouterLink :to="{ name: 'articlecreate' }">
      [Article Create]
    </RouterLink>
    <hr>
    <label for="search">검색: </label>
    <input type="text" id="search" v-model="search" @keyup.enter="searchArticles">
    <button @click="searchArticles">검색하기</button>
    <div v-if="onSearch">
      <div v-for="article in articles.slice((currentPage - 1) * perPage, currentPage * perPage)">
        <p>{{ article.username }}</p>
        <RouterLink 
          :to="{ name: 'articledetail', params: { id: article.id } }"
        >
          {{ article.title }}
        </RouterLink>
        <hr>
      </div>
    </div>
    <div v-else>
      <div v-for="article in articleStore.articles.slice((currentPage - 1) * perPage, currentPage * perPage)">
        <p>{{ article.username }}</p>
        <RouterLink 
          :to="{ name: 'articledetail', params: { id: article.id } }"
        >
          {{ article.title }}
        </RouterLink>
        <hr>
      </div>
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
  if (onSearch.value) {
    return Array.from({length: Math.ceil(articles.value.length / perPage.value)}, (v, i) => i + 1)
  } else {
    return Array.from({length: Math.ceil(articleStore.articles.length / perPage.value)}, (v, i) => i + 1)
  }
})
const perPage = ref(10)
const currentPage = ref(1)
const onSearch = ref(false)

const changePage = (page) => {
  currentPage.value = page
}

onMounted(() => {
  articleStore.getArticles()
})

const searchArticles = () => {
  articles.value = articleStore.articles
  const searchResult = articles.value.filter((article) => 
    article.title.includes(search.value) || article.content.includes(search.value)
  )
  articles.value = searchResult
  onSearch.value = true
}
</script>

<style scoped>
.pagination {
  display: flex;
  list-style: none;
}
</style>