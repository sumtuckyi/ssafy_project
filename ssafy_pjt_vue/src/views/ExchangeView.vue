<template>
	<div class="container">
		<h2>환율계산기</h2>
		<p class="title">어떤 통화로 바꾸실 건가요?</p>
		<form>
			<select id="cat-select" v-model="currency" required>
				<option value="" disabled>환전을 원하는 통화를 선택하세요.</option>
				<option v-for="(value, key) in store.cur_unit_code" :value="key">{{ value }}</option>
			</select>
			<input type="text" id="title" v-model="from" @input="changeValue('from')">
			<label for="title"> ₩ </label>
			<span class="material-symbols-outlined">sync_alt</span>
			<input name="content" v-model="to" @input="changeValue('to')">
		</form>
		<div class="canvas">
			<canvas ref="chartCanvas"></canvas>
		</div>
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



watch(currency, (item) => {
	// console.log(typeof item)
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
						// to.value = (from.value / rate.value).toFixed()
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

// 여기서부터 차트 그리기
const YER = { 'USD': [1244.423, 1275.16, 1305.278, 1322.19, 1327.691, 1297.141, 1284.133, 1321.139, 1332.933, 1350.564],
	'			JPY': [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]}

Chart.register(...registerables)
const chartCanvas = ref('');
let chartInstance = null;
onMounted(() => {
	chartInstance = new Chart(chartCanvas.value?.getContext('2d'), {
        type: 'line',
        data: {
          labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월'],
          datasets: [{
            label: 'Yearly Exchange Rate (USD to KRW)',
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
				stepSize: 20,
				},
				min: 500,
				max: 2000,
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
	justify-content: center;
	align-items: center;
}
form {
	margin-bottom: 2rem;
}
select {
	margin-right: 1rem;
	height: 35px;
	display: block;
}
.title {
	margin-top: 2rem;
	font-size: 2rem;
}
.canvas {
	height: 400px;
	width: 700px;
}

/* @import url('https://fonts.googleapis.com/icon?family=Material+Icons'); */
.material-symbols-outlined {
	line-height: 2;
	margin: 0.5rem;
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 25
}
canvas {
	width: 400px;
	height: 300px;
}
form {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	line-height: 4;
	height: 3rem;
	padding: 1rem;
}
label {
	margin: 0.5rem;
}
input {
	position: relative;
	cursor: text;
	font-size: 14px;
	line-height: 20px;
	
	height: 40px;
	background-color: #fff;
	border: 1px solid #d6d6e7;
	border-radius: 3px;
	color: rgb(35, 38, 59);
	box-shadow: inset 0 1px 4px 0 rgb(119 122 175 / 30%);
	overflow: hidden;
	transition: all 100ms ease-in-out;
}
input:focus {
	border-color: #3c4fe0;
	box-shadow: 0 1px 0 0 rgb(35 38 59 / 5%);
}
</style>