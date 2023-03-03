import { ref } from 'vue'
import { getCurrentWheather } from '@/api/wheather'

export const useWheather = () => {
  const data = ref(null)
  const isLoading = ref(false)
  const errors = ref(null)

  const getData = ({ city }) => {
    return new Promise((resolve, reject) => {
      isLoading.value = true
      getCurrentWheather(city)
        .then((res) => {
          data.value = res
          errors.value = null
          isLoading.value = false
          resolve(res)
        })
        .catch((err) => {
          data.value = null
          errors.value = err.response.data.message
          isLoading.value = false
          reject(err)
        })
    })
  }

  return { data, errors, isLoading, getData }
}
