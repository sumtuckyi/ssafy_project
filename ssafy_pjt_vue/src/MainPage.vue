<template>
    <div class="container">
        <div class="wrapper">
            <img src="../public/bankmate2.png" alt="main">
						<div class="sign-up">
							<p>Make Your Account</p>
							<button>가입하기</button>
							<button>로그인</button>
						</div>
        </div>
        <div id="carousel-container">
            <transition name="fade" mode="out-in">
                <div 
                :key="currentSlide" 
                class="fade"
                >
                    {{ currentSlide + 1 }}
                    <p>text text text</p>
                </div>
            </transition>
        </div>
        <div id="news">
            <p>금융뉴스 가져오기</p>
            {{ news.items }}
            <ul>
                <li v-for="(item, index) in news" :key="index">
                    <a :href="item.link"><p>{{ item.title }}</p></a>
                    <p>{{ item.pubDate.slice(0, 17) }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, watch, onBeforeUnmount, onMounted } from 'vue'
import config from '../config/config'
import { useCounterStore } from './stores/counter';

const store = useCounterStore()
const currentSlide = ref(0);
const slides = [
    'Slide 1',
    'Slide 2',
    'Slide 3',
    // Add more slides as needed
];
const interval = 4000; // Change slide every 3 seconds
let intervalId;

// 금융뉴스 가져오기 - 장고로 요청 보내기 

// const URL = `${store.API_URL}/api3/get_news/`
const news = ref([])
const get_finance_news = function () {
    axios({
        url: `${store.API_URL}/api3/get_news/`,
        method: 'get'
    })
        .then((res) => {
            console.log(res)
            news.value = res.data.items
            console.log(news.value)
            // 불필요한 문자 제거하기 
            for(const item of news.value) {
                console.log(item.title)
                item.title = item.title.replace(/&quot;/g, '"')
                .replace(/<b>/g, '')
                .replace(/<\/b>/g, '');
            }
            // news.value.items.title

        })
        .catch((err) => {
            console.log(err)
        })
}

onMounted(() => {
    get_finance_news()
    store.get_dep()
    store.get_sav()
    store.save_deposits()
    store.save_savings()
})



const startCarousel = () => {
    intervalId = setInterval(nextSlide, interval);
};

const stopCarousel = () => {
    clearInterval(intervalId);
};

const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % slides.length;
};

watch(currentSlide, () => {
    stopCarousel();
    startCarousel();
});

onBeforeUnmount(() => {
    stopCarousel();
});

startCarousel();


</script>

<style scoped>
body {
    height: 100vh;
		background-color: #F8F9FD;
}
.container {
  height: 1500px; /* Ensure the container takes the full viewport height */
  margin: auto 0;
	display: flex;
	flex-direction: column;
	align-items: center;
  padding: 0;
}
img {
	justify-self: end;
	width: 450px;
	height: 300px;
	border-radius: 5px;
}
.wrapper {
	display: flex;
	width: 900px;
	justify-content: space-between;
	margin-bottom: 2rem;
}
.sign-up {
	font-size: 4rem;
	padding: 1rem;
	text-align: center;
}
#carousel-container {
    border: 1px gray solid;
    width: 900px;
    height: 300px;
    overflow: hidden;
}
#news {
    width: 900px;
    height: 300px;
    margin: 10px auto;
    border: 1px gray solid;
}
#news p {
    display: inline;
    margin: 0.5rem;
    line-height: 1.5;
}

.fade {
    height: 50%;
    min-width: 100%;
    box-sizing: border-box;
    text-align: center;
    font-size: 2em;
    padding: 20px;
    background-color: transparent;
    transition: transform 1s ease-in-out; /* Add a transition effect for smooth sliding */
    will-change: transform; /* Optimize for smoother animations */
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
#news a {
    text-decoration: none;
    color: black;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
li {
    list-style: none;
}
@keyframes rotateBackground {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
button {
  appearance: none;
  background-color: transparent;
  border: 2px solid #1A1A1A;
  border-radius: 25px;
  box-sizing: border-box;
  color: #3B3B3B;
  cursor: pointer;
  display: inline-block;
  /* font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"; */
  font-size: 13px;
  font-weight: 600;
  line-height: normal;
  margin: 5px;
  min-height: 30px;
  min-width: 0;
  outline: none;
  padding: 12px 5px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100px;
  will-change: transform;
}

button:disabled {
  pointer-events: none;
}

button:hover {
  color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

button:active {
  box-shadow: none;
  transform: translateY(0);
}
</style>