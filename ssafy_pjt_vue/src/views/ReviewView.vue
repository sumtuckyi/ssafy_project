<template>
  <div>
    <h1>Review</h1>
    <RouterLink :to="{ name: 'reviewcreate' }">
      [Review Create]
    </RouterLink>
    <div v-for="review in reviewStore.reviews">
      <p>{{ review.id }}</p>
      <RouterLink 
        :to="{ name: 'reviewdetail', params: { id: review.id } }"
      >
        {{ review.title }}
      </RouterLink>
      <hr>
    </div>
  </div>
</template>

<script setup>
import { useReviewStore } from '../stores/review';
import { useUserStore } from '../stores/user';
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const reviewStore = useReviewStore()
const userStore = useUserStore()
onMounted(() => {
  reviewStore.getReviews()
})
</script>

<style scoped>

</style>