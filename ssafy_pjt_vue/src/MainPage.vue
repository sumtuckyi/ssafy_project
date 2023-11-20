<template>
    <div>
        <h1>main page</h1>
        <div id="carousel-container">
            <transition name="fade" mode="out-in">
                <div 
                :key="currentSlide" 
                class="fade"
                >
                    {{ currentSlide + 1 }}
                    <p>text text text</p>
                    <img src="../public/favicon.ico" alt="">
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
    height: 1000px;
}
#carousel-container {
    border: 1px gray solid;
    width: 80%;
    height: 300px;
    margin: auto;
    overflow: hidden;
}
#news {
    width: 80%;
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

.fade-enter, .fade-leave-to {
    opacity: 0;
}
li {
    list-style: none;
}
</style>