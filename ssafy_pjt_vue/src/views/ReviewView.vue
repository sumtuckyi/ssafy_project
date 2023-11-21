<template>
  <div>
    <h1>Review</h1>
    <RouterLink :to="{ name: 'reviewcreate' }">
      [Review Create]
    </RouterLink>
    <hr>
    <label for="search">검색: </label>
    <input type="text" id="search" v-model="search" @keyup.enter="searchReviews">
    <button @click="searchReviews">검색하기</button>
    <div v-if="onSearch">
      <div v-for="review in reviews.slice((currentPage - 1) * perPage, currentPage * perPage)">
        <p>{{ review.username }}</p>
        <RouterLink 
          :to="{ name: 'reviewdetail', params: { id: review.id } }"
        >
          {{ review.title }}
        </RouterLink>
        <hr>
      </div>
    </div>
    <div v-else>
      <div v-for="review in reviewStore.reviews.slice((currentPage - 1) * perPage, currentPage * perPage)">
        <p>{{ review.username }}</p>
        <RouterLink 
          :to="{ name: 'reviewdetail', params: { id: review.id } }"
        >
          {{ review.title }}
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
import { useReviewStore } from '../stores/review';
import { onMounted, ref, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const reviewStore = useReviewStore()
const reviews = ref([])
const search = ref('')
const pages = computed(() => {
  if (onSearch.value) {
    return Array.from({length: Math.ceil(reviews.value.length / perPage.value)}, (v, i) => i + 1)
  } else {
    return Array.from({length: Math.ceil(reviewStore.reviews.length / perPage.value)}, (v, i) => i + 1)
  }
})
const perPage = ref(10)
const currentPage = ref(1)
const onSearch = ref(false)

const changePage = (page) => {
  currentPage.value = page
}

onMounted(() => {
  reviewStore.getReviews()
})

const searchReviews = () => {
  reviews.value = reviewStore.reviews
  const searchResult = reviews.value.filter((review) => 
    review.title.includes(search.value) || review.content.includes(search.value)
  )
  reviews.value = searchResult
  onSearch.value = true
}
</script>

<style scoped>
.pagination {
  display: flex;
  list-style: none;
}
</style>