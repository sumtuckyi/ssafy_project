<template>
	<div>
		<div>
			<h1>적금 상품 조회</h1>
			<router-link :to="{ name: 'deposit' }"><button>예금 상품 조회</button></router-link>
		</div>
		<div class="buttons">
			<button @click="sortByCustomers">인기순</button>
			<button @click="sortByRate">금리순</button>
		</div>
		<div 
			v-for="product in products.slice((currentPage - 1)*perPage, currentPage * perPage)"
			:key="product.id"
			class="box"
			@click="goDetail(product.fin_prdt_cd)"
		>
			<div @click="goDetail(product.fin_prdt_cd)">
				<p>은행 : {{ product.kor_co_nm }}</p>
				<p>상품 : {{ product.fin_prdt_nm }}</p>
				<p>가입방식 : {{ product.join_way }}</p>
			</div>
		</div>
		<div>
			<ul>
				<li 
					v-for="page in pages"
					@click="changePage(page)"
				>
					<button>{{ page }}</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect  } from 'vue'
import { useCounterStore } from '../stores/counter'; 
import { useRouter } from 'vue-router';
import axios from 'axios'
const store = useCounterStore()
const router = useRouter()

const products = ref([])
const goDetail = function (key) {
	router.push({name: 'savingDetail', params: {id: key}})
}

//pagination
const pages = computed(() => {
	return Array.from({length: Math.ceil(products.value.length / perPage.value)}, (v, i) => i + 1)
})
const perPage = ref(5)
const currentPage = ref(1)
const changePage = (page) => {
	currentPage.value = page
} // 표시될 페이지의 인덱스로 현재페이지를 바꿔주기 

// 상품 목록 정렬하기 - 금리 순으로 
const sortedArr_rate = ref([])
watchEffect(() => {
	sortedArr_rate.value = products.value.slice().sort((a, b) => {
		const fa = a.intr_rate2
		const fb = b.intr_rate2
		if (fa < fb) {
			return -1
		} if ( fa > fb) {
			return 1
		} else {
			return 0
		}
	})
})
const sortByRate = function () {
	products.value = sortedArr_rate.value 
}

// 상품 목록 정렬하기 - 가입자 순으로
const sortedArr_customer = ref([]) 
watchEffect(() => {
	sortedArr_customer.value = products.value.slice().sort((a, b) => {
		const fa = a.like_users.length
		const fb = b.like_users.length
		if (fa < fb) {
			return 1
		} if (fa > fb) {
			return -1
		}
		return 0
	})
})
const sortByCustomers = function () {
	products.value = sortedArr_customer.value
}


onMounted(() => {
	store.get_sav()
	axios({
		method: 'get',
		url: `${store.API_URL}/api2/savings/`
	})
		.then((res) => {
			console.log(res.data)
			products.value = res.data
		})
		.catch((err) => {
			console.log(err)
		})
})
</script>

<style scoped>
.box {
	position: relative;
	margin: 0.5rem;
	padding: 1rem;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
}
.box button {
	border: none;
	position: absolute;
	right: 0;
	top: 0;
	background-color: transparent;
}
ul {
	display: flex;
	list-style: none;
	justify-content: center;
	align-items: center;
}
ul button {
	width: 1rem;
	height: 1rem;
	text-align: center;
}
</style>