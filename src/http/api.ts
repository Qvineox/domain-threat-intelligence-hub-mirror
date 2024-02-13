import axios from "axios";
import AuthService from "@/services/authService.ts";

const API_URL = import.meta.env.VITE_API_URL + '/api/' + import.meta.env.VITE_API_VERSION + "/"

export const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

export const apiNoAuth = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    config.headers['x-api-key'] = sessionStorage.getItem("access_token")

    return config
})

api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true

        try {
            const response = await AuthService.refresh()
            sessionStorage.setItem("access_token", response.data.AccessToken)

            return api.request(originalRequest)
        } catch (e) {
            console.error("user unauthorized")
        }
    }

    throw error
})

export interface ApiError {
    ErrorCode: number
    ErrorMessage: string
    ErrorModule: string
    StatusCode: number
}
