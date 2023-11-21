<template>
  <header>
    <div class="wrapper">
      <nav>
        <ul>
          <li>
            <RouterLink :to="{ name: 'main' }" class="home"><span>B</span>ank<span>MATE</span></RouterLink> 
          </li>
          <li>
            <RouterLink :to="{ name: 'exchange' }"><p>환전</p></RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'map' }">은행찾기</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'product' }">상품조회</RouterLink>
          </li>
          <li @mouseover="openDropdown('article')" @mouseleave="closeDropdown('article')">
            <a>게시판</a>
            <ul v-show="isArticleDropdownOpen">
              <RouterLink :to="{ name: 'articles'}">Articles</RouterLink>
              <RouterLink :to="{ name: 'reviews'}">Reviews</RouterLink>
            </ul>
          </li>
          <li 
            @mouseover="openDropdown" @mouseleave="closeDropdown"
            v-if="!userStore.isLogin"
          >
            <a href="">회원</a>
            <ul v-show="isUserDropdownOpen">
              <RouterLink 
                v-if="!userStore.isLogin" 
                :to="{ name: 'login' }">Login</RouterLink>
              <RouterLink   
                v-if="!userStore.isLogin" 
                :to="{ name: 'signup' }">SignUp</RouterLink>
            </ul>
          </li>
          <li>
            <a @click="userStore.logOut" v-if="userStore.isLogin">Logout</a>
          </li>
          <li>
            <RouterLink 
              v-if="userStore.isLogin"
              :to="{ name: 'profile' }">Profile
            </RouterLink>
          </li>
        </ul>
      </nav>

      <span v-if="userStore.user.is_staff">관리자</span>
      <span v-if="userStore.isLogin">{{ userStore.user.username }}님 안녕하세요!</span>
      
    </div>
  </header>
  <RouterView />
  <Footer />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import Footer from '@/components/footer.vue'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()

const isArticleDropdownOpen = ref(false)
const isUserDropdownOpen = ref(false)
const openDropdown = (text) => {
    if (text === 'article') {
      isArticleDropdownOpen.value = true
    } else {
      isUserDropdownOpen.value = true
    }
}
const closeDropdown = (text) => {
  if (text === 'article') {
    isArticleDropdownOpen.value = false
  } else {
    isUserDropdownOpen.value = false
  }
}



</script>


<style scoped>
header {
	background-color: transparent;
  color: #00B6FF;
  height: 50px;
  padding: 1rem;
}
body {
  height: 100vh;
}
.home {
  font-weight: 600;
  font-size: 1.5rem;
}

.wrapper {
  height: 100%;
}
nav {
  width: 100%;
  color: #00B6FF;
  /* text-align: center; */
  line-height: 1.5;
  font-size: 1rem;
  background-color: white;
}
nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}
nav li {
  margin-right: 20px;
  position: relative;
}
span {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1B4DFF;
}


nav a {
  display: block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  text-decoration: none;
  color: #00B6FF;
}
nav ul ul {
  position: absolute;
  top: 100%;
  left: 0;

}
nav ul li:hover > ul {
  display: inherit;
}
nav a:first-of-type {
  border: 0;
}

</style>