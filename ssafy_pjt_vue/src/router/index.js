import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

import ArticleView from '@/views/ArticleView.vue'
import ArticleDetailView from '@/views/ArticleDetailView.vue'
import ArticleCreateView from '@/views/ArticleCreateView.vue'
import ArticleUpdateView from '@/views/ArticleUpdateView.vue'

import ReviewView from '@/views/ReviewView.vue'
import ReviewDetailView from '@/views/ReviewDetailView.vue'
import ReviewCreateView from '@/views/ReviewCreateView.vue'
import ReviewUpdateView from '@/views/ReviewUpdateView.vue'

import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticleView
    },
    {
      path: '/articles/:id',
      name: 'articledetail',
      component: ArticleDetailView
    },
    {
      path: '/articles/create',
      name: 'articlecreate',
      component: ArticleCreateView
    },
    {
      path: '/articles/:id/update',
      name: 'articleupdate',
      component: ArticleUpdateView
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: ReviewView
    },
    {
      path: '/reviews/:id',
      name: 'reviewdetail',
      component: ReviewDetailView
    },
    {
      path: '/reviews/create',
      name: 'reviewcreate',
      component: ReviewCreateView
    },
    {
      path: '/reviews/:id/update',
      name: 'reviewupdate',
      component: ReviewUpdateView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
  ]
})

import { useUserStore } from '@/stores/user'

router.beforeEach((to, from) => {
  const store = useUserStore()
  if (to.name === 'articlecreate' && !store.isLogin) {
    window.alert('로그인이 필요합니다.')
    return { name: 'login' }
  }
  if (to.name === 'articleupdate' && !store.isLogin) {
    window.alert('로그인이 필요합니다.')
    return { name: 'login' }
  }
  if ((to.name === 'signup' || to.name === 'login') && (store.isLogin)) {
    window.alert('이미 로그인 했습니다.')
    return { name: 'home' }
  }
  if (to.name === 'reviewcreate' && !store.isLogin) {
    window.alert('로그인이 필요합니다.')
    return { name: 'login' }
  }
  if (to.name === 'reviewupdate' && !store.isLogin) {
    window.alert('로그인이 필요합니다.')
    return { name: 'login' }
  }
})

export default router
