import { AxiosInstance } from 'axios'
import axios from 'axios'

const service = axios.create({
    baseURL: 'https://api.paixin.com',
    timeout: 15000,
})

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    })
service.interceptors.response.use()

const Axios: AxiosInstance = service

export default Axios.post
