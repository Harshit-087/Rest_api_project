import axios from "axios"
import { store } from "../../store/store"

/**
 * The `token` httpOnly cookie is set on the **Next.js app host** (see `api/auth/signin`).
 * Cross-origin requests to the Express API do NOT include that cookie (different site).
 * The backend `AuthMiddleware` accepts `Authorization: Bearer`, so we attach the JWT from
 * Redux (persisted) so task/user API calls still work after reload in production.
 */
export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        "content-type": "application/json"
    },
    withCredentials: true
})

axiosInstance.interceptors.request.use((config) => {
    if (typeof window === "undefined") return config
    try {
        const token = store.getState().token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    } catch {
        /* ignore */
    }
    return config
})