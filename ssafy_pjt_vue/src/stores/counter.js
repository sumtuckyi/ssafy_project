import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCounterStore = defineStore('counter', () => {
  const API_URL = 'http://127.0.0.1:8000'
  const ArrForDepCom = ref([])// 예금 상품 비교
  const ArrForSavCom = ref([]) //적금 상품 비교
  
  const depPdtList = ref([])
  const savPdtList = ref([]) 
  

  const cur_unit_code = {
    'AED': '아랍에미리트 디르함',
    'AUD': '호주 달러',
    'BHD': '바레인 디나르',
    'BND': '브루나이 달러',
    'CAD': '캐나다 달러',
    'CHF': '스위스 프랑',
    'CNH': '위안화',
    'DKK': '덴마아크 크로네',
    'EUR': '유로',
    'GBP': '영국 파운드',
    'HKD': '홍콩 달러',
    'IDR(100)': '인도네시아 루피아',
    'JPY(100)': '일본 옌',
    'KWD': '쿠웨이트 디나르',
    'MYR': '말레이지아 링기트',
    'NOK': '노르웨이 크로네',
    'NZD': '뉴질랜드 달러',
    'SAR': '사우디 리얄',
    'SEK': '스웨덴 크로나',
    'SGD': '싱가포르 달러',
    'THB': '태국 바트',
    'USD': '미국 달러'
  }
  
  // 장고 서버에 요청을 보내 예금상품 정보를 데이터베이스에 저장하도록 함
  const get_dep = function () {
    axios({
      method: 'get',
      url: `${API_URL}/api2/save_deposits/`
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // 장고 서버에 요청을 보내 적금상품+옵션 정보를 데이터베이스에 저장하도록 함
  const get_sav = function () {
    axios({
      method: 'get',
      url: `${API_URL}/api2/save_savings/`
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // 장고 서버에 요청을 보내 해당 예금상품의 옵션을 전부 가져오기
  const get_dep_opts = function (fin_prdt_cd) {
    axios({
      method: 'get',
      url: `${API_URL}/api2/deposits/options/${fin_prdt_cd}/`
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const get_sav_opts = function (fin_prdt_cd) {
    axios({
      method: 'get',
      url: `${API_URL}/api2/savings/options/${fin_prdt_cd}/`
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 장고 서버에 요청을 보내 예금상품 리스트 받아와 스토어에 저장하기 
  const save_deposits = function () {
    axios({
      method: 'get',
      url: `${API_URL}/api2/deposits/`
    })
      .then((res) => {
        console.log(res)
        depPdtList.value = res.data
        console.log(depPdtList.value)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const save_savings = function () {
    axios({
      mathod: 'get', 
      url: `${API_URL}/api2/savings/`
    })
      .then((res) => {
        console.log(res)
        savPdtList.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return { API_URL, cur_unit_code, get_dep, get_sav, ArrForDepCom, ArrForSavCom, get_dep_opts, get_sav_opts,
    save_deposits, save_savings, depPdtList, savPdtList }
}, { persist: true })
