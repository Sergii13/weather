import { axios } from '@/api/axios'

const apiKey = '697badb530f4c8c5eeaa95144c6b2385'
const apiKeyCities = 'f23e3b5c553e42349f0104507230303'

export const getCurrentWheather = (city) => {
  return axios
    .get(`onecall?lat=${city.lat}&lon=${city.lon}&exclude=minutely&units=metric&appid=${apiKey}`)
    .then((response) => response.data)
}
export const getCoordinates = (city) => {
  return axios
    .get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
    .then((response) => response.data[0])
}
export const getCities = (query) => {
  return axios
    .get(`https://api.weatherapi.com/v1/search.json?key=${apiKeyCities}&q=${query}`)
    .then((response) => response)
}
