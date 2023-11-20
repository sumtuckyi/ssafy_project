<template>
	<div class="container">
		<h1>환율계산기</h1>
		<form>
			<label for="cat-select">환전하고자 하는 통화: </label>
			<select id="cat-select" v-model="currency" required>
				<option value="" disabled>please choose an option</option>
				<option v-for="(value, key) in store.cur_unit_code" :value="key">{{ value }}</option>
			</select>
			<input type="text" id="title" v-model="from" @input="changeValue('from')">
			<label for="title">₩</label>
			<span class="material-symbols-outlined">sync_alt</span>
			<input name="content" v-model="to" @input="changeValue('to')">
		</form>
		<canvas ref="chartCanvas"></canvas>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useCounterStore } from '../stores/counter'
import { Chart, registerables } from 'chart.js'
import axios from 'axios'
const currency = ref('')

const from = ref('') 
const data = ref([])
const to = ref('')
const store = useCounterStore()
const rate = ref('')
// const setValue = function () {
// 	console.log(from.value)
// 	console.log(to.value)
// 	to.value = (from.value / rate.value).toFixed(0)
// }


watch(currency, (item) => {
	console.log(typeof item)
	// 환율 가져오기
	axios({
      method: 'get',
      url: `${store.API_URL}/api/exchange/`
    })
      .then((res) => {
        console.log(res.data)
				data.value = res.data
				console.log(data.value)
				for (let i=0; i<data.value.length; i++) {
					if (data.value[i].cur_unit === item) {
						if (item === 'IDR(100)' || item === 'JPY(100)') {
							rate.value = data.value[i].bkpr / 100
						} else {
							rate.value = data.value[i].bkpr
						}
						console.log(rate.value)
						to.value = (from.value / rate.value).toFixed()
						return
					} 
				}
      })
      .catch((err) => {
		console.log(err)
      })
	
})
const changeValue = function(text) {
	if(text === 'from') {
		to.value = (from.value / rate.value).toFixed()
	} else {
		from.value = (to.value * rate.value).toFixed()
	}
}
// watch(to.value, (newValue) => {
// 	from.value = (newValue * rate.value).toFixed(2)
// })
// 여기서부터 차트 그리기

const YER = { 'USD': [1244.423, 1275.16, 1305.278, 1322.19, 1327.691, 1297.141, 1284.133, 1321.139, 1332.933, 1350.564] }

Chart.register(...registerables)
const chartCanvas = ref('');
let chartInstance = null;
onMounted(() => {
	chartInstance = new Chart(chartCanvas.value?.getContext('2d'), {
        type: 'line',
        data: {
          labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월'],
          datasets: [{
            label: 'Yearly Exchange Rate (USD to EUR)',
            data: YER['USD'],
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
						backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
							ticks: {
							stepSize: 5,
							}
            },
        }
      }}
			)
} )


</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
}
form {
	margin-bottom: 2rem;
}
/* @import url('https://fonts.googleapis.com/icon?family=Material+Icons'); */
.material-symbols-outlined {
	margin: 0.5rem;
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24
}

</style>