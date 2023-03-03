import axios from 'axios'
const apiKey = '697badb530f4c8c5eeaa95144c6b2385'
const apiKey2 = 'f23e3b5c553e42349f0104507230303'
axios.defaults.baseURL = 'https://api.openweathermap.org/data/3.0/'

export { axios, apiKey, apiKey2 }
