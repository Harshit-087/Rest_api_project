import {axiosInstance} from "./axiosInstance"


export const taskQuery = {
    fetchTasks:async()=>{
        return await axiosInstance.get("/task-api/v1/all-tasks")
    },
    createTask:async(payload:{title:string,description:string,status:string,userId:string})=>{
        console.log("reached createTask api")
        return await axiosInstance.post("/task-api/v1/task",payload)
    },
   updateTask:async(payload:{id:string,title:string,description:string,status:string})=>{
    return await axiosInstance.put(`/task-api/v1/task/${payload.id}`,payload)
   },
   deleteTask:async(id:string)=>{
    return await axiosInstance.delete(`/task-api/v1/task/${id}`)
   },
   fetchMyTasks:async(userId:string)=>{
    return await axiosInstance.get(`/task-api/v1/my-tasks/${userId}`)

   }
}