import { ref } from 'vue'
import { getCities as getApiCities } from '@/api/wheather'

export const useCities = () => {
  const data = ref(null)
  const isLoading = ref(false)
  const errors = ref(null)

  const getCities = ({ query }) => {
    return new Promise((resolve, reject) => {
      isLoading.value = true
      getApiCities(query)
        .then((res) => {
          data.value = res.data
          errors.value = null
          isLoading.value = false
          resolve(res)
        })
        .catch((err) => {
          data.value = null
          errors.value = err
          isLoading.value = false
          reject(err)
        })
    })
  }

  return { data, errors, isLoading, getCities }
}
