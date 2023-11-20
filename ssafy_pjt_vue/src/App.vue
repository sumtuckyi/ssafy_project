<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink :to="{ name: 'main' }" class="home"><span>B</span>ank<span>MATE</span></RouterLink> 
        <RouterLink :to="{ name: 'exchange' }"><p>환전</p></RouterLink>
        <RouterLink :to="{ name: 'map' }">은행찾기</RouterLink>
        <RouterLink :to="{ name: 'product' }">상품조회</RouterLink>

        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/articles">Articles</RouterLink>
        <RouterLink to="/reviews">Reviews</RouterLink>
        <RouterLink 
          v-if="!userStore.isLogin" 
          :to="{ name: 'login' }">Login</RouterLink>
        <RouterLink 
          v-if="!userStore.isLogin" 
          :to="{ name: 'signup' }">SignUp</RouterLink>
        <a @click="userStore.logOut" v-if="userStore.isLogin">Logout</a>
      </nav>

      <p v-if="userStore.user.is_staff">관리자</p>
      <p v-if="userStore.isLogin">{{ userStore.user.pk }}님 안녕하세요!</p>
      <RouterLink 
        v-if="userStore.isLogin"
      :to="{ name: 'profile' }">Profile</RouterLink>

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
  text-align: center;
  line-height: 1.5;
  font-size: 1rem;
  background-color: transparent;
}

span {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1B4DFF;
}


nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  text-decoration: none;
  color: #00B6FF;
}

nav a:first-of-type {
  border: 0;
}

</style>
