import {axiosInstance} from "./axiosInstance"

export type DataItem ={
    name:string,
    email:string,
    phone:string
    password:string
}

export const userQuery = {
    registerUser:async(payload:DataItem)=>{
        console.log("reached registerUser api")
        return await axiosInstance.post("/user-api/v1/signup",payload)
    },
    signinUser:async(payload:{email:string,password:string})=>{
        return await axiosInstance.post("/user-api/v1/signin",payload)
    },
    signOutUser:async()=>{
        return await axiosInstance.post("/user-api/v1/signout")
    }
}