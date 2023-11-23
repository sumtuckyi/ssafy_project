<template>
    <div class="container">
        <p class="intro">{{ type_of_pdt }}상품 중 가장 금리가 높은 상품을 보여드릴게요.</p>
        <div>
            <ul>
                <li v-for="pdt in bestPdt" :key="pdt.id" @click="goDetail(type, pdt.fin_prdt_cd)">
                    <!-- <p>id: {{ pdt.id }}</p> -->
                    <div>
                        <p class="bank-name">{{ pdt.kor_co_nm }}</p>
                        <p class="pdt-name">{{ pdt.fin_prdt_nm }}</p>
                    </div>
                    <div>
                        <p class="rate">{{ pdt.max_option + '%' }}</p>
                    </div>
                    <!-- <p v-for="opt in pdt.opts" :key="opt.id">
                        <span>최고 우대 금리: {{ opt.intr_rate2 }}</span> <br>
                        <span v-if="type_of_pdt === '적금'">적립 유형 : {{ opt.rsrv_type_nm }}</span>
                    </p> -->
                </li>
                <!-- <li v-for="pdt in bestPdt" :key="pdt.id">
                    <p>id: {{ pdt.id }}</p>
                    <p>은행 : {{ pdt.fin_co_no }}</p>
                    <p>최고 우대금리 : {{ pdt.intr_rate2 }}</p>
                    <p>적립 유형 : {{ pdt.rsrv_type_nm }}</p>
                </li> -->
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { useCounterStore } from '../stores/counter';
import { useRoute, useRouter } from 'vue-router';
// 서버에 요청을 보내 4개만 받기
const bestPdt = ref([])
const bestOpt = ref([])
const store = useCounterStore()
const route = useRoute()
const router = useRouter()
const type = route.params.type
const per = route.params.per 
const fin_co_no = []
const type_of_pdt = type === 'dep' ? '예금' : '적금'

// db에서 최고 금리 옵션과 연결된 상품을 찾아서 가져오기 
// const get_best_four = function () {
//     console.log(type, per)
//     axios({
//         method: 'get',
//         url: `${store.API_URL}/api2/best/${type}/${per}/`,
//     })
//         .then((res) => {
//             console.log(res)
//             bestPdt.value = res.data.ProdList
//             bestOpt.value = res.data.OptList
//             console.log(bestOpt.value)
//             console.log(typeof bestOpt.value)
//             // 하나의 상품에 딸린 여러 개의 옵션을 응답으로 받은 경우, 그 중 가장 높은 금리만 보여주기
//             for (const pdt of bestPdt.value){
//                 pdt.opts = []
//                 const idx = pdt.fin_co_no
//                 // 옵션 중 해당 상품과 연결된 것을 찾기
//                 for(const item of bestOpt.value) {
//                     if (idx === item.fin_co_no) {
//                         pdt.opts.push(item) 
//                         console.log(pdt.opts)
//                     }
//                 console.log(item.fin_co_no)
//                 fin_co_no.push(item.fin_co_no)
//             }
//             }
            
//             console.log(fin_co_no)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// }
const get_best_four = function () {
    let temp_list
    if (type === 'dep') {
        temp_list = store.depPdtList.slice()
    } else {
        temp_list = store.savPdtList.slice()
    }
     // 스토어에서 가져오기
    bestPdt.value = temp_list.sort((a, b) => {
        const fa = a.max_option
        const fb = b.max_option

        if (fa < fb) {
            return 1
        } if (fa > fb) {
            return -1
        } else {
            return 0
        }
    }).slice(0, 4)
}
const goDetail = function (pdt_type, key) {
    if (pdt_type === 'dep') {
        router.push({name: 'depositDetail', params: {id: key}})
    } else {
        router.push({name: 'savingDetail', params: {id: key}})
    }
}

onMounted(() => {
    store.get_dep()
    store.get_sav()
    get_best_four()
    store.save_deposits()
    store.save_savings()
    console.log(type)
})

</script>

<style scoped>
.container {
    display: flex;
    width: 1000px;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
}
.intro {
    margin: 2rem;
    padding: 1.5rem;
    font-size: 2rem;
}
.bank-name {
    font-size: 20px;
}
.pdt-name {
    font-size: 25px;
    color: #F25871;
}
.rate {
    font-size: 2rem;
}
ul {
    list-style: none;
}
li {
    display: flex;
    justify-content: space-between;
    width: 600px;
    padding: 2rem;
    margin: 1rem;
    line-height: 2;
    font-size: 1.25rem;
    text-align: left;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
    border-radius: 5px;
}
span {
    font-size: 15px;
}
img {
    width: 70px;
    height: 70px;
}
</style>