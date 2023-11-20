<template>
	<div>
		<h1>적금 상품 상세 정보</h1>
		<div class="box">
			<h3>{{ data.fin_prdt_nm }}</h3>
			<p>가입 방법:{{ data.join_way }}</p>
			<p>만기 후 이자율:{{ data.mtrt_int }}</p>
			<p>가입대상: {{ data.join_member }}</p>
			<p>최고한도: {{ data.max_limit }}</p>
			<p>우대조건: {{ data.spcl_cnd }}</p>
			<p>가입제한: {{ data.join_deny }}</p>
			<p>기타 유의사항: {{ data.etc_note }}</p>
			<button>가입하기</button>
			<button>관심상품에 저장</button>
		</div>
	</div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter';
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

const store = useCounterStore()
const route = useRoute()

const data = ref('')
const fin_prdt_cd = route.params.id
onMounted(() => {
	axios({
		method: 'get',
		url: `${store.API_URL}/api2/savings/${fin_prdt_cd}/`
	})
		.then((res) => {
			console.log(res)
			data.value = res.data
		})
		.catch((err) => {
			console.log(err)
		})
})
</script>

<style scoped>
.box {
	padding: 2rem;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
</style>