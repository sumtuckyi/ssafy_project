<template>
    <div class="container">
        <div class="wrapper">
            <img src="../public/card.gif" alt="main">
						<div class="sign-up">
							<p v-if="!userStore.isLogin">Make Your Account!</p>
							<p v-else>Welcome back, {{ userStore.user.username }}!</p>
							<button v-if="!userStore.isLogin">
								<RouterLink :to="{ name: 'login' }">
								로그인</RouterLink>
							</button>
							<button v-if="!userStore.isLogin">
								<RouterLink :to="{ name: 'signup' }">
								가입하기</RouterLink>
							</button>
							<button v-else>
								<RouterLink :to="{ name: 'profile' }">
								마이 페이지
								</RouterLink>
							</button>
						</div>
        </div>
				<div class="carousel">
					<swiper :options="swiperOptions">
						<swiper-slide v-for="item in carouselItems" :key="item.id">
							<!-- Your carousel item content goes here -->
							<img :src="item.image" alt="Carousel Item" />
						</swiper-slide>
						<!-- Add more slides as needed -->
					</swiper>
				</div>
        <!-- <div id="carousel-container">
            <transition name="fade" mode="out-in">
                <div 
                :key="currentSlide" 
                class="fade"
                >
                    {{ currentSlide + 1 }}
                    <p>text text text</p>
                </div>
            </transition>
        </div> -->
        <div id="news">
            <h3>NEWS</h3>
						<!-- <p>{{ news.items }}</p> -->
            <ul class="news">
                <li v-for="(item, index) in news" :key="index" class="news-item">
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
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
// import 'swiper/swiper-bundle.css';

const userStore = useUserStore()
const store = useCounterStore()

//
const swiperOptions = ref({
      slidesPerView: 1,
      spaceBetween: 15,
      loop: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
    });

const carouselItems = ref([
	{ id: 1, image: '../public/Grad_15.png' },
	{ id: 2, image: '../public/Grad_17.png' },
	// Add more items as needed
]);

// onMounted(() => {
//       // Access Swiper instance and destroy it when component is unmounted
//       const swiper = document.querySelector('.carousel').swiper;
//       if (swiper) swiper.destroy(true, true);
//     });



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
								.replace(/&amp;/g, '&')
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



//carousel
// const startCarousel = () => {
//     intervalId = setInterval(nextSlide, interval);
// };

// const stopCarousel = () => {
//     clearInterval(intervalId);
// };

// const nextSlide = () => {
//     currentSlide.value = (currentSlide.value + 1) % slides.length;
// };

// watch(currentSlide, () => {
//     stopCarousel();
//     startCarousel();
// });

// onBeforeUnmount(() => {
//     stopCarousel();
// });

// startCarousel();


</script>

<style scoped>
body {
    height: 100vh;
	background-color: #F8F9FD;
}
.container {
  /* height: 1500px;  */
  margin: auto 0;
	height: 1500px;
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
	margin-top: 25px;
}
.sign-up {
	font-size: 4rem;
	padding: 1rem;
	text-align: center;
}
.news {
	padding: 2rem;
}
.news-item {
	display: flex;
	justify-content: space-between;
}
#carousel-container {
    border: 1px gray solid;
    width: 900px;
    height: 400px;
    overflow: hidden;
}
.carousel {
  width: 100%;
  overflow: hidden;
}
#news {
    width: 900px;
    height: 400px;
    margin: 10px auto;
		margin-top: 25px;
    
}
#news p {
    display: inline;
    margin: 0.5rem;
    line-height: 1.5;
}
#news h3 {
	border-bottom: #3B3B3B solid 1px;
	font-size: 25px;
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
  font-size: 15px;
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
  /* background-color: #1A1A1A; */
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

button:active {
  box-shadow: none;
  transform: translateY(0);
}
a {
	text-decoration: none;
	color: #1A1A1A;
}


</style>