<template>
	<div>
		<div>
			<h1>적금 상품 조회</h1>
			<router-link :to="{ name: 'deposit' }"><button>예금 상품 조회</button></router-link>
		</div>
		<div 
			v-for="product in products"
			:key="product.id"
			class="box"
			@click="goDetail(product.fin_prdt_cd)"
		>
			<p>id : {{ product.id }}</p>
			<p>은행 : {{ product.kor_co_nm }}</p>
			<p>상품 : {{ product.fin_prdt_nm }}</p>
			<p>가입방식 : {{ product.join_way }}</p>
			<p>만기 후 이자율 : {{ product.mtrt_int }}</p>
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
	router.push({name: 'savingDetail', params: {id: key}})
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
	margin: 0.5rem;
	padding: 1rem;
	border-bottom: 0.5px solid saddlebrown;
}
</style>