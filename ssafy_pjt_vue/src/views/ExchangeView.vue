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
		<p>{{ currency === 'IDR(100)' || currency === 'JPY(100)' ? rate * 100 : rate }} ₩ = {{ currency === 'IDR(100)' || currency === 'JPY(100)' ? 100 : 1 }} {{ currency }}</p>
		<br>
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
const to = ref(1)
const store = useCounterStore()
const rate = ref('')

Chart.register(...registerables)


watch(currency, (item) => {
	if (Chart.getChart(chartCanvas.value)) {
		Chart.getChart(chartCanvas.value).destroy()
	}
	graph()
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
					to.value = 100
					from.value = (to.value * rate.value)
				} else {
					to.value = 1
					rate.value = data.value[i].bkpr
					from.value = (to.value * rate.value)
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
const YER = { 
	'USD': [1244.423, 1275.16, 1305.278, 1322.19, 1327.691, 1297.141, 1284.133, 1321.139, 1332.933, 1350.564],
	'JPY(100)': [958.19, 963.42, 981.41, 994.53, 970.74, 918.43, 911.02, 914.21, 903.59, 903.69],
	'EUR': [1343.70, 1371.80, 1402.13, 1454.27, 1444.70, 1408.18, 1421.56, 1443.25, 1425.76, 1429.55],
	'GBP': [1523.67, 1548.17, 1588.65, 1651.07, 1660.30, 1640.79, 1655.65, 1680.94, 1655.96, 1646.32],
	'CAD': [928.32, 953.13, 955.94, 982.66, 984.05, 977.49, 972.38, 981.77, 984.44, 986.25],
	'CHF': [1349.28, 1384.85, 1415.18, 1475.18, 1482.06, 1442.19, 1471.04, 1505.71, 1487.44, 1498.55],
	'HKD': [159.53, 163.20, 166.64, 168.83, 169.69, 165.84, 164.44, 169.05, 170.35, 172.79],
	'CNH': [183.55, 187.06, 189.54, 192.23, 189.91, 181.00, 178.65, 182.13, 182.63, 184.71],
	'THB': [37.46, 37.64, 38.05, 38.79, 38.97, 37.25, 37.22, 37.89, 37.38, 37.17],
	'IDR(100)': [8.18, 8.47, 8.57, 8.92, 8.99, 8.68, 8.56, 8.69, 8.69, 8.57],
	'SEK': [119.91, 122.78, 124.85, 128.05, 127.14, 120.61, 122.14, 122.23, 120.12, 122.67],
	'AUD': [865.95, 884.86, 873.44, 885.98, 884.06, 871.88, 865.70, 858.11, 856.78, 858.49],
	'DKK': [180.54, 184.34, 188.19, 195.00, 193.98, 189.02, 190.72, 193.68, 191.33, 191.55],
	'NOK': [125.48, 125.37, 124.17, 126.21, 123.10, 120.33, 125.15, 126.48, 124.30, 122.65],
	'SAR': [332.08, 341.31, 348.34, 353.29, 354.61, 346.33, 342.73, 352.68, 355.52, 360.41],
	'KWD': [4080.90, 4184.11, 4263.89, 4324.74, 4332.56, 4226.30, 4188.24, 4297.26, 4319.75, 4371.56],
	'BHD': [3308.66, 3396.52, 3469.06, 3515.12, 3526.94, 3445.27, 3409.76, 3509.18, 3538.93, 3588.96],
	'AED': [339.64, 348.64, 356.11, 360.86, 362.12, 353.65, 349.99, 360.17, 363.06, 368.05],
	'SGD': [940.63, 962.03, 975.61, 995.07, 992.59, 964.56, 963.16, 979.58, 978.53, 987.63],
	'MYR': [287.55, 293.91, 292.68, 299.64, 294.78, 280.42, 279.55, 287.33, 285.15, 284.64],
	'NZD': [797.55, 806.52, 811.88, 822.97, 826.76, 796.52, 800.41, 793.41, 790.10, 796.32],
	'BND': [940.16, 962.31, 975.48, 995.31, 992.89, 964.96, 962.70, 980.14, 978.73, 987.56]
}
const chartCanvas = ref('');
let chartInstance = null;
// onMounted(() => {
// 	chartInstance = new Chart(chartCanvas.value?.getContext('2d'), {
//         type: 'line',
//         data: {
//           labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월'],
//           datasets: [{
//             label: 'Yearly Exchange Rate (USD to KRW)',
//             data: YER['USD'],
//             fill: true,
//             borderColor: 'rgb(75, 192, 192)',
// 						backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             tension: 0.1
//           }]
//         },
//         options: {
//           scales: {
//             y: {
//               	beginAtZero: true,
// 				ticks: {
// 					stepSize: (Math.max(...YER['USD']) - Math.min(...YER['USD'])) / 5,
// 				},
// 				min: Math.min(...YER['USD']) * 0.95,
// 				max: Math.max(...YER['USD']) * 1.05,
//             },
//         }
//       }}
// 	)
// } )

const graph = function () {
	chartInstance = new Chart(chartCanvas.value?.getContext('2d'), {
		type: 'line',
		data: {
			labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월'],
			datasets: [{
				label: `Monthly Exchange Rate (${currency.value} to KRW)`,
				data: YER[`${currency.value}`],
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
						stepSize: (Math.max(...YER[`${currency.value}`]) - Math.min(...YER[`${currency.value}`])) / 5,
						},
						min: Math.min(...YER[`${currency.value}`]) * 0.95,
						max: Math.max(...YER[`${currency.value}`]) * 1.05,
					},
			}
		}}
	)
}

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