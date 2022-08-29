import axios from 'axios'

import authService from './authService'

const API_URL = process.env.API_URL

const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      originalRequest.url.includes('/auth/refresh')
    ) {
      return Promise.reject(error)
    } else if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      await authService.refresh()
      return instance(originalRequest)
    }
    return Promise.reject(error)
  }
)

export default instance
