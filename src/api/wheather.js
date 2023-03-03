import { axios, apiKey, apiKey2 } from '@/api/axios'

export const getCurrentWheather = (city) => {
  return axios
    .get(`onecall?lat=${city.lat}&lon=${city.lon}&exclude=minutely&units=metric&appid=${apiKey}`)
    .then((response) => response.data)
}
export const getCoordinates = (city) => {
  return axios
    .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
    .then((response) => response.data[0])
}
export const getCities = (query) => {
  return axios
    .get(`http://api.weatherapi.com/v1/search.json?key=${apiKey2}&q=${query}`)
    .then((response) => response)
}
