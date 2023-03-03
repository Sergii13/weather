import { axios } from '@/api/axios'

const apiKey = '5fb93939cb224aa4bd297139c013b08f'

export const getIp = () => {
  return axios
    .get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}`)
    .then((res) => res.data)
}
