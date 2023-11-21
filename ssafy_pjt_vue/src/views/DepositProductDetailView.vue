<template>
	<div>
		<button @click="goBack">뒤로가기</button>
		<h1>예금 상품 상세 정보</h1>
		<div class="box">
			<h3>{{ data.fin_prdt_nm }}</h3>
			<p>{{ data.join_way }}</p>
			<p>만기 후 이자율 :{{ data.mtrt_int }}</p>
			<p>가입대상 : {{ data.join_member }}</p>
			<p>최고한도 : {{ max_limit }}</p>
			<p>우대조건 : {{ data.spcl_cnd }}</p>
			<p>가입제한 : {{ data.join_deny }}</p>
			<p>기타 유의사항 : {{ data.etc_note }}</p>
			<button v-if="!isLike" @click="likeProduct(data.fin_prdt_cd)">관심상품에 저장</button>
			<button v-else @click="likeProduct(fin_prdt_cd)">관심상품에서 삭제</button>
			<button @click="addToArray(data)">비교하기</button>
		</div>
		<div class="options">
			<ul>
				<li v-for="opt in opts">
					<p>금리 유형 : {{ opt.intr_rate_type_nm }}</p>
					<p>저축기간 : {{ opt.save_trm }}개월</p>
					<p>최고우대금리 : {{ opt.intr_rate2 }}</p>
					<button @click="joinDeposit(opt.id)">가입하기</button>
				</li> 
			</ul>
		</div>
		<div v-if="showModal" class="modal">
			<div class="modal-content">
				<button @click="closeModal">닫기</button>
				<h3>상품 비교하기</h3>
				<p v-if="isEmpty">아직 담은 상품이 없습니다.</p>
				<div class="container">
					<div v-for="item in Arr" :key="item.id" class="card">
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
import { useUserStore } from '../stores/user';
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

const store = useCounterStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const showModal = ref(false)
const opts = ref([])
const isEmpty = computed(() => {
	return Arr.value.length === 0
})
const get_dep_opts = function (fin_prdt_cd) {
    axios({
      method: 'get',
      url: `${store.API_URL}/api2/deposits/options/${fin_prdt_cd}/`
    })
      .then((res) => {
        console.log(res)
		opts.value = res.data
		console.log(opts.value)
      })
      .catch((err) => {
        console.log(err)
      })
  }
const showOpts = function (fin_prdt_cd) {
	get_dep_opts(fin_prdt_cd)

}
// 비교할 상품 2개를 담을 배열
let Arr = ref(store.ArrForDepCom)
// 사용자가 클릭하면 해당 상품을 비교상품 배열에 추가 - 중복 제거, 2개로 제한
const addToArray = function (product) {
	// console.log(store.ArrForCmpDep)

	if(Arr.value.length < 2){
		if(Arr.value.length === 0) {
			Arr.value.push(product)
			// 한 개가 담겼을 때, 모달 띄우기
			showModal.value = true
		} else {
			if(Arr.value[0].id != product.id){
				Arr.value.push(product)
				showModal.value = true
				// console.log(ArrForCmp.value)
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
	Arr.value = Arr.value.filter((item) => item.id !== id)
	store.ArrForDepCom = Arr.value
	console.log(id)
	console.log(Arr.value)
}

const max_limit = computed(() => {
	return data.value.max_limit !== -1 ? data.value.max_limit : '없음'
})

const isLike = ref(false)
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
			isLike.value = res.data.like_users.includes(userStore.user.pk)
		})
		.catch((err) => {
			console.log(err)
		})
	showOpts(route.params.id)
})

const likeProduct = function (fin_prdt_cd) {
	store.like_deposits(fin_prdt_cd)
	isLike.value = !isLike.value
}

const joinDeposit = function (opt_pk) {
	store.join_deposits(opt_pk)
}

const goBack = function () {
	router.go(-1)
}
</script>

<style scoped>
.box {
	padding: 2rem;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
.options {
	padding: 2rem;
	margin: 1rem;
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
ul {
	list-style: none;
}
li {
	margin: 1rem;
	display: flex;
}
li > p {
	margin-right: 2rem;
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