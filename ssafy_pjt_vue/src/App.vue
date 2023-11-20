<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink :to="{ name: 'main' }"><span>BankMATE</span></RouterLink> 
        <RouterLink :to="{ name: 'exchange' }"><p>Exchange</p></RouterLink>
        <RouterLink :to="{ name: 'map' }">Map</RouterLink>
        <RouterLink :to="{ name: 'product' }">Fin Products</RouterLink>

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
import Footer from '@/components/footer.vue'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()
</script>


<style scoped>
header {
	background-color: transparent;
  color: #1B4DFF;
  height: 50px;
}
body {
  height: 1000px;
}
.wrapper {
  height: 100%;
}
nav {
  width: 100%;
  text-align: center;
  line-height: 1.5;
  font-size: 1.5rem;
  background-color: transparent;
}
#snowman {
  font-family: daylife day;
}
span {
  font-size: 1.5rem;
  font-weight: bold;
  font-family:'Times New Roman', Times, serif;
}
nav a.router-link-exact-active {
  color: #1B4DFF;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  text-decoration: none;
}

nav a:first-of-type {
  border: 0;
}

</style>
