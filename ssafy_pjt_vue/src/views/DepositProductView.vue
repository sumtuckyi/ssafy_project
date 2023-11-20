<template>
	<div>
		<div>
			<h1>예금 상품 조회</h1>
			<router-link :to="{ name: 'saving' }">적금 상품 조회</router-link>
		</div>
		<div 
			v-for="product in products"
			:key="product.id"
			class="box"
		>
			<button @click="showOpts(product.fin_prdt_cd)">options</button>
			<div @click="goDetail(product.fin_prdt_cd)">
				<p>은행 : {{ product.kor_co_nm }}</p>
				<p>상품 : {{ product.fin_prdt_nm }}</p>
				<p>가입방식 : {{ product.join_way }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCounterStore } from '../stores/counter'; 
import { useRouter } from 'vue-router';
import axios from 'axios'
const store = useCounterStore()
const router = useRouter()

const products = ref([])
const goDetail = function (key) {
	router.push({name: 'depositDetail', params: {id: key}})
}
const showOpts = function (fin_prdt_cd) {
	store.get_dep_opts(fin_prdt_cd)
}

onMounted(() => {
	store.get_dep()
	axios({
		method: 'get',
		url: `${store.API_URL}/api2/deposits/`
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
</style>