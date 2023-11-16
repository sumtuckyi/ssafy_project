import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const token = ref(null)
  const API_URL = 'http://127.0.0.1:8000'
  const user = ref({ pk: '' })

  const isLogin = computed(() => {
    if (token.value === null) {
      return false
    } else {
      return true
    }
  })

  const signUp = function (payload) {
    const { username, password1, password2, email, first_name, last_name } = payload
    axios({
      method: 'post',
      url: `${API_URL}/accounts/signup/`,
      data: {
        username, password1, password2,
        email, first_name, last_name
      }
    })
      .then((res) => {
        logIn({ username, password1 })
        router.push({ name: 'home' })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const logIn = function (payload) {
    const { username, password } = payload
    axios({
      method: 'post',
      url: `${API_URL}/accounts/login/`,
      data: {
        username, password
      }
    })
      .then((res) => {
        token.value = res.data.key
        axios({
          method: 'get',
          url: `${API_URL}/accounts/user/`,
          headers: {
            Authorization: `Token ${token.value}`
          }
        })
          .then((res) => {
            user.value = res.data
          })
          .catch(err => console.log(err))
        router.push({ name: 'home' })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const logOut = function () {
    axios({
      method: 'post',
      url: `${API_URL}/accounts/logout/`,
    })
      .then((res) => {
        token.value = null
        user.value = { pk: ''}
        router.push({ name: 'home' })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return { API_URL, token, isLogin, user, signUp, logIn, logOut }
}, { persist: true })
