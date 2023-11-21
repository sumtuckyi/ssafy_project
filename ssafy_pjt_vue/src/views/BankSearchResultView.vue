<template>
	<div>
		<p><strong>{{ keyword }}</strong>(으)로 검색한 상품입니다.</p>
		<p v-if="!isDepEmpty">예금상품</p>
		<p v-for="pdt in pdtList_d" :key="pdt.id">{{ pdt }}</p>
		<p v-if="!isSavEmpty">적금상품</p>
		<p v-for="pdt in pdtList_s" :key="pdt.id">{{ pdt }}</p>
		<p v-if="noResult">검색 결과가 없습니다.</p>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, computed } from 'vue'
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { useCounterStore } from '../stores/counter';

const route = useRoute()
const store = useCounterStore()
const keyword = route.params.name // 사용자가 검색을 원하는 은행명
const pdtList_d = ref([]) // 해당 은행의 예금 상품 리스트 
const pdtList_s = ref([]) // 해당 은행의 적금 상품 리스트 
const temp_list = ref([]) 
const temp_list2 = ref([])

const isDepEmpty = computed(() => {
	return pdtList_d.value.length === 0
})

const isSavEmpty = computed(() => {
	return pdtList_s.value.length === 0
})

const noResult = computed(() => {
	return (pdtList_d.value.length === 0) && (pdtList_d.value.length === 0)
})

onMounted(() => {
	console.log(keyword)
	// 해당 은행의 예금 상품 조회
	// console.log(store.depPdtList)
	temp_list.value = store.depPdtList
	
	const temp = temp_list.value.filter((item) => 
		item.kor_co_nm.includes(keyword))
	console.log(temp)
	pdtList_d.value = temp
	
	// 해당 은행의 적금 상품 조회
	temp_list2.value = store.savPdtList

	const temp2 = temp_list2.value.filter((item) => 
		item.kor_co_nm.includes(keyword))
	pdtList_s.value = temp2
	
})


// const searchArticles = () => {
//   articles.value = articleStore.articles
//   const searchResult = articles.value.filter((article) => 
//     article.title.includes(search.value) || article.content.includes(search.value)
//   )
//   console.log(searchResult)
//   articles.value = searchResult
// }

</script>

<style scoped>

</style>