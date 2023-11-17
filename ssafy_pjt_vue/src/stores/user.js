import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const token = ref(null)
  const API_URL = 'http://127.0.0.1:8000'
  const user = ref({ pk: '' })
  const typeChange = {
    '알뜰형': 1,
    '도전형': 2,
    '성실형': 3,
    1: '알뜰형',
    2: '도전형',
    3: '성실형'
  }
  const portfolio = ref(null)
  const pfExist = computed(() => {
    if (portfolio.value === null) {
      return false
    } else {
      return true
    }
  })

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
        logIn({ username, password: password1 })
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

        getUser()
        getPortfolio()

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
        portfolio.value = null
        router.push({ name: 'home' })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getUser = function () {
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
  }

  const getPortfolio = function () {
    axios({
      method: 'get',
      url: `${API_URL}/portfolios/detail/`,
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
      .then((res) => {
        portfolio.value = res.data
      })
      .catch(err => console.log(err))
  }

  const createPortfolio = function (payload) {
    const { job, income, age, preffered_bank, investment_type } = payload
    axios({
      method: 'post',
      url: `${API_URL}/portfolios/create/`,
      data: {
        job,
        income,
        age,
        preffered_bank,
        investment_type: typeChange[investment_type]
      },
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
      .then((res) => {
        portfolio.value = res.data
        router.push({ name: 'profile' })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const updatePortfolio = function (payload) {
    const { job, income, age, preffered_bank, investment_type } = payload
    axios({
      method: 'put',
      url: `${API_URL}/portfolios/detail/`,
      data: {
        job,
        income,
        age,
        preffered_bank,
        investment_type: typeChange[investment_type]
      },
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
      .then((res) => {
        portfolio.value = res.data
        router.push({ name: 'profile' })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return { API_URL, token, isLogin, user, signUp, logIn, logOut,
    typeChange, portfolio, pfExist, getUser, getPortfolio, createPortfolio, updatePortfolio }
}, { persist: true })
