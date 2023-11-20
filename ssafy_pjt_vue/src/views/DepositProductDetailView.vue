<template>
	<div>
		<button @click="goBack">뒤로가기</button>
		<h1>예금 상품 상세 정보</h1>
		<div class="box">
			<h3>{{ data.fin_prdt_nm }}</h3>
			<p>가입 방법 :{{ data.join_way }}</p>
			<p>만기 후 이자율 :{{ data.mtrt_int }}</p>
			<p>가입대상 : {{ data.join_member }}</p>
			<p>최고한도 : {{ max_limit }}</p>
			<p>우대조건 : {{ data.spcl_cnd }}</p>
			<p>가입제한 : {{ data.join_deny }}</p>
			<p>기타 유의사항 : {{ data.etc_note }}</p>
			<button>가입하기</button>
			<button>관심상품에 저장</button>
			<button @click="addToArray(data)">비교하기</button>
		</div>
		<div v-if="showModal" class="modal">
			<div class="modal-content">
				<button @click="closeModal">닫기</button>
				<h3>상품 비교하기</h3>
				<p v-if="isEmpty">아직 담은 상품이 없습니다.</p>
				<div class="container">
					<div v-for="item in ArrForCmp" :key="item.id" class="card">
						<button @click="deletePdt(item.id)">삭제</button>
						<p>{{ item.fin_prdt_nm }}</p>
						<p>{{ item.kor_co_nm }}</p>
						<p>{{ item.mtrt_int }}</p>
					</div>
				</div>
				
			</div>
			
		</div>
	</div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter';
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

const store = useCounterStore()
const route = useRoute()
const router = useRouter()
const showModal = ref(false)
const isEmpty = computed(() => {
	return ArrForCmp.value.length === 0
})
// 비교할 상품 2개를 담을 배열
let ArrForCmp = ref(store.ArrForCmpDep)
// 사용자가 클릭하면 해당 상품을 비교상품 배열에 추가 - 중복 제거, 2개로 제한
const addToArray = function (product) {
	console.log(store.ArrForCmpDep)

	if(ArrForCmp.value.length < 2){
		if(ArrForCmp.value.length === 0) {
			ArrForCmp.value.push(product)
			// 한 개가 담겼을 때, 모달 띄우기
			showModal.value = true
		} else {
			if(ArrForCmp.value[0].id != product.id){
				ArrForCmp.value.push(product)
				showModal.value = true
				console.log(ArrForCmp.value)
			} else {
				const answer = window.confirm('이미 담은 상품입니다.')
				if (answer === true) {
					showModal.value = true
				}
			}
		}
		
	} else {
		const answer = window.confirm('이미 2개의 상품을 담았습니다.')
		if (answer === true) {
			showModal.value = true
		}
	}
}
const closeModal = function () {
	showModal.value = false
}

// 비교함에 담은 상품 삭제하기
const deletePdt = function (id) {
	console.log(typeof ArrForCmp)
	ArrForCmp.value = ArrForCmp.value.filter((item) => item.id !== id)
	console.log(id)
	console.log(ArrForCmp.value)
}

const max_limit = computed(() => {
	return data.value.max_limit !== -1 ? data.value.max_limit : '없음'
})

const data = ref('')
const fin_prdt_cd = route.params.id
onMounted(() => {
	axios({
		method: 'get',
		url: `${store.API_URL}/api2/deposits/${fin_prdt_cd}/`
	})
		.then((res) => {
			console.log(res)
			data.value = res.data
		})
		.catch((err) => {
			console.log(err)
		})
})

const goBack = function () {
	router.go(-1)
}
</script>

<style scoped>
.box {
	padding: 2rem;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
.modal {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
}
.modal-content {
	position: relative;
  width: 100%;
  height: max-content;
  background-color: #60A5FA;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: white;
  padding: 1rem;
  margin: 0 auto;
  animation: move 0.1s ease-in;
}
.modal-content button {
	position: fixed;
	top: 0;
	right: 0;
	
}
.container {
	display: flex;
	justify-content: center;
}
.card {
	position: relative;
	margin: 0;
	width: 40%;
	border: white 0.5px solid;
}
.card button {
	position: absolute;
	top: 0;
	right: 0;
}
.card p{
	margin: 0;
	padding: 0.5rem;
	font-size: 1rem;
}
@keyframes move {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>