import axios from "axios"
import {axiosInstance} from "./axiosInstance"

export type DataItem ={
    name:string,
    email:string,
    phone:string
    password:string
}

/**
 * Sign-in / sign-out must hit **same-origin** `/api/auth/*` routes so Set-Cookie applies
 * to the Next.js hostname. Posting to `NEXT_PUBLIC_BACKEND_URL` only stores the cookie on
 * the API host, which middleware on the app host cannot read (see `api/auth/signin/route.ts`).
 */
const sameOriginApi = axios.create({
    baseURL: "",
    headers: {
        "content-type": "application/json"
    },
    withCredentials: true
})

export const userQuery = {
    registerUser:async(payload:DataItem)=>{
        console.log("reached registerUser api")
        return await axiosInstance.post("/user-api/v1/signup",payload)
    },
    signinUser:async(payload:{email:string,password:string})=>{
        return await sameOriginApi.post("/api/auth/signin",payload)
    },
    signOutUser:async()=>{
        return await sameOriginApi.post("/api/auth/signout")
    }
}