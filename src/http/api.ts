import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + '/api/' + import.meta.env.VITE_API_VERSION + "/"

const api = axios.create({
    // withCredentials: true,
    baseURL: API_URL
})

// api.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`
//
//     return config
// })

// api.interceptors.response.use((config) => {
//     return config
// }, async (error) => {
//     const originalRequest = error.config
//
//     if (error.response.status === 401 && error.config && !error.config._isRetry) {
//         originalRequest._isRetry = true
//
//         try {
//             const response = await axios.post<AuthResponse>(`${API_URL}/auth/refresh`, {}, {withCredentials: true})
//             localStorage.setItem("access_token", response.data.accessToken.Token)
//
//             return api.request(originalRequest)
//         } catch (e) {
//             console.error("user unauthorized")
//         }
//     }
//
//     throw error
// })

export interface ApiError {
    ErrorCode: number
    ErrorMessage: string
    ErrorModule: string
    StatusCode: number
}

export default api
