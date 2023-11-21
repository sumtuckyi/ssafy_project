<template>
	<div>
		<h1>금융 상품 조회</h1>
		<div class="wrapper1">
			<h3>인기상품</h3>
			<ul>
				<li 
					v-for="pdt in temp_pdts"
					:key="pdt.id"
				>
				<p>{{ pdt.fin_prdt_nm }}</p>
			</li>
			</ul>
		</div>
		<div class="wrapper2">
			<h3>최고 금리 상품 조회</h3>
			<div class="container">
				<form @submit.prevent="filterPdt">
					<div id="pdt">
						<p>예금종류</p>
						<!-- <input type="radio" name="all-pdt" value="all-pdt" v-model="type">
						<label for="all-pdt">전체</label> -->
						<input type="radio" name="dep" value="dep" v-model="type">
						<label for="dep">예금</label>
						<input type="radio" name="sav" value="sav" v-model="type">
						<label for="sav">적금</label>
					</div>
					<div id="period">
						<p>가입기간</p>
						<input type="radio" name="all" value="all" v-model="period">
						<label for="all">전체</label>
						<input type="radio" name="6" value="6" v-model="period">
						<label for="6">6개월</label>
						<input type="radio" name="12" value="12" v-model="period">
						<label for="12">12개월</label>
						<input type="radio" name="24" value="24" v-model="period">
						<label for="24">24개월</label>
						<input type="radio" name="36" value="36" v-model="period">
						<label for="36">36개월</label>
					</div>
					<button>조회</button>
					<p v-if="isError">아직 선택을 마치지 않았습니다.</p>
				</form>
			</div>
		</div>
		<div class="wrapper3">
			<h3>원하는 상품 직접 검색</h3>
			<form @submit.prevent="goSearch">
				<input type="text" v-model="keyword" placeholder="은행명을 입력하세요.">
				<button type="submit">검색</button>
			</form>
		</div>
		
		<RouterLink :to="{ name: 'deposit' }">예금 조회</RouterLink>
		<RouterLink :to="{ name: 'saving' }">적금 조회</RouterLink>
	</div>
	 
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { useCounterStore } from '../stores/counter';
import { useRoute, useRouter } from 'vue-router';
const products = ref([])
const temp_pdts = ref([]) // 나중에 가입자수가 많은 순으로 3개의 상품만 받아서 저장할 것
const store = useCounterStore()
const router = useRouter()

const type = ref(null)
const period = ref(null)
const isError = ref(false)
const keyword = ref('')

const filterPdt = function () {
	// 사용자가 하나라도 선택하지 않으면
	if (!period.value || !type.value) {
		console.log("dd")
		// Display an error message or handle the case where both fields are not selected
		// alert('Please select values for both fields');
		isError.value = true
		return
	} else { // 두 가지 필드를 모두 선택한 경우
		isError.value = false
		router.push({ name:'searchBestPdt', params: { type: type.value, per: period.value }})
	}
	console.log(type.value, period.value)
}

const goSearch = function () {
	router.push({ name: 'bankSearch', params: { name: keyword.value }})
}

onMounted(() => {
	// 예금정보를 db에 저장 - 인기상품 기능 예시를 위해 추가한 함수. 나중에 지우면 됨
	
	store.save_deposits() // db -> 스토어 
	store.save_savings()
	const temp_data = store.depPdtList // 스토어에서 예금 상품 리스트 가져오기
	console.log('정렬 이전', temp_data)
	temp_data.sort((a, b) => 
			b.like_users.length - a.like_users.length
		)	
	console.log(temp_data[4].like_users.length)
	temp_pdts.value = temp_data.slice(0, 3)
})
</script>

<style scoped>
a {
	text-decoration: none;
	margin: 0.5rem;
}
.wrapper1 {
	border: 1px solid black;
}
.wrapper2 {
	border: 1px solid rosybrown;
	display: flex;
	flex-direction: column;
}
.container {
	border: 1px solid darkcyan;
	display: flex;
}
#pdt {
	margin: 0.5rem;
	display: flex;
}
#pdt p {
	padding: 0.5rem;
}
#period {
	margin: 0.5rem;
	display: flex;
}
#period p {
	padding: 0.5rem;
}
.wrapper3 {
	border: 1px solid darkred;
}
</style>