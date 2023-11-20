<template>
  <div>
    <h1>Review</h1>
    <RouterLink :to="{ name: 'reviewcreate' }">
      [Review Create]
    </RouterLink>
    <hr>
    <label for="search">검색: </label>
    <input type="text" id="search" v-model="search">
    <button @click="searchReviews">검색하기</button>
    <div v-for="review in reviews.slice((currentPage - 1) * perPage, currentPage * perPage)">
      <p>{{ review.id }}</p>
      <RouterLink 
        :to="{ name: 'reviewdetail', params: { id: review.id } }"
      >
        {{ review.title }}
      </RouterLink>
      <hr>
    </div>
    <ul class="pagination">
      <li v-for="page in pages" @click="changePage(page)"><button>{{ page }}</button></li>
    </ul>
  </div>
</template>

<script setup>
import { useReviewStore } from '../stores/review';
import { onMounted, ref, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const reviewStore = useReviewStore()
const reviews = ref([])
const search = ref('')
const pages = computed(() => {
  return Array.from({length: Math.ceil(reviews.value.length / perPage.value)}, (v, i) => i + 1)
})
const perPage = ref(10)
const currentPage = ref(1)

const changePage = (page) => {
  currentPage.value = page
}

onMounted(() => {
  reviewStore.getReviews()
  reviews.value = reviewStore.reviews
})

const searchReviews = () => {
  reviews.value = reviewStore.reviews
  const searchResult = reviews.value.filter((review) => 
    review.title.includes(search.value) || review.content.includes(search.value)
  )
  reviews.value = searchResult
}
</script>

<style scoped>
.pagination {
  display: flex;
  list-style: none;
}
</style>