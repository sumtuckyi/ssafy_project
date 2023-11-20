<template>
    <div class="container">
        <p class="intro">{{ type_of_pdt }}상품 중 가장 금리가 높은 상품 4개를 보여드릴게요.</p>
        <div>
            <ul>
                <li v-for="pdt in bestPdt" :key="pdt.id">
                    <!-- <p>id: {{ pdt.id }}</p> -->
                    <p>은행: {{ pdt.kor_co_nm }}</p>
                    <p>상품명: {{ pdt.fin_prdt_nm }}</p>
                    <p v-for="opt in pdt.opts" :key="opt.id">최고 우대 금리: {{ opt.intr_rate2 }} / 적립 유형 : {{ opt.rsrv_type_nm }}</p>
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
import { useRoute } from 'vue-router';
// 서버에 요청을 보내 4개만 받기
const bestPdt = ref([])
const bestOpt = ref([])
const store = useCounterStore()
const route = useRoute()
const type = route.params.type
const per = route.params.per 
const fin_co_no = []
const type_of_pdt = type === 'dep' ? '예금' : '적금'

// db에서 최고 금리 옵션과 연결된 상품을 찾아서 가져오기 
const get_best_four = function () {
    console.log(type, per)
    axios({
        method: 'get',
        url: `${store.API_URL}/api2/best/${type}/${per}/`,
    })
        .then((res) => {
            console.log(res)
            bestPdt.value = res.data.ProdList
            bestOpt.value = res.data.OptList
            console.log(bestOpt.value)
            console.log(typeof bestOpt.value)
            // 하나의 상품에 딸린 여러 개의 옵션을 응답으로 받은 경우, 그 중 가장 높은 금리만 보여주기\
            for (const pdt of bestPdt.value){
                pdt.opts = []
                const idx = pdt.fin_co_no
                // 옵션 중 해당 상품과 연결된 것을 찾기
                for(const item of bestOpt.value) {
                    if (idx === item.fin_co_no) {
                        pdt.opts.push(item) 
                        console.log(pdt.opts)
                    }
                console.log(item.fin_co_no)
                fin_co_no.push(item.fin_co_no)
            }
            }
            
            console.log(fin_co_no)
        })
        .catch((err) => {
            console.log(err)
        })
}

onMounted(() => {
    store.get_dep()
    store.get_sav()
    get_best_four()
})

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.intro {
    margin: 2rem;
    padding: 1.5rem;
    font-size: 2rem;
}
ul {
    list-style: none;
}
li {
    width: 100%;
    padding: 2rem;
    margin: 1rem;
    line-height: 2;
    font-size: 1.25rem;
    text-align: left;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: 5px;
}
</style>