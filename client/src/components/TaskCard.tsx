"use client"
import { useState } from "react"
import {useMutation,useQueryClient} from "@tanstack/react-query"
import {taskQuery} from "../app/api/taskQuery"
import {TaskItem} from "../types/task"
 
export default function TaskCard({ task }: { task: TaskItem }) {

    const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    id:task._id,
    title: task.title,
    description: task.description,
    status:task.status
  })
  
  const updateMutation = useMutation({
    mutationFn:async(formData:{id:string,title:string,description:string,status:string})=>{
        return await taskQuery.updateTask(formData)
    },
    onSuccess:(res)=>{
        console.log("successfully updated the task",res)
        queryClient.invalidateQueries({queryKey:["allTasks"]})
        queryClient.invalidateQueries({queryKey:["myTasks"]})
    },
    onError:(error)=>{
       console.log("error in updating the task",error)
    }
  })


  const deleteMutation = useMutation({
    mutationFn:async(id:string)=>{
        return await taskQuery.deleteTask(id)
    },
    onSuccess:(res)=>{
        console.log("successfully deleted the task",res)
        queryClient.invalidateQueries({queryKey:["allTasks"]})
        queryClient.invalidateQueries({queryKey:["myTasks"]})
    },
    onError:(error)=>{
       console.log("error in deleting the task",error)
    }
  })
 

  const toggleEdit = () => {
    if (isEditing) {
      // Here is where you would normally call your Mutation to save to the DB
     updateMutation.mutate(formData)
    }
    setIsEditing(!isEditing)
  }

  const handleDelete=()=>{
    deleteMutation.mutate(task._id)
  }

  return (
    <div className={`group relative rounded-xl border p-5 transition-all bg-white 
      ${isEditing ? "border-black shadow-lg" : "border-zinc-200 hover:border-zinc-300 shadow-sm"}`}>
      
      <div className="space-y-4">
       
        <div>
          <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Title</label>
          <input
            disabled={!isEditing}
            value={formData.title}
            onChange={(e)=>setFormData({...formData,title:e.target.value})}
            className={`w-full bg-transparent text-lg font-semibold outline-none transition-all
              ${isEditing ? "border-b border-zinc-300 pb-1" : "border-transparent cursor-default"}`}
          />
        </div>

      
        <div>
          <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Description</label>
          <textarea
            disabled={!isEditing}
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={`w-full bg-transparent text-sm text-zinc-600 resize-none outline-none transition-all
              ${isEditing ? "border-b border-zinc-300" : "border-transparent cursor-default"}`}
          />
        </div>
      

      <div>
          <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">status</label>
          <input
            disabled={!isEditing}
           
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className={`w-full bg-transparent text-lg font-semibold  outline-none transition-all
              ${isEditing ? "border-b border-zinc-300 pb-1" : "border-transparent cursor-default"}`}
          />
        </div>
      </div>

      
      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={toggleEdit}
          disabled={deleteMutation.isPending}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all
            ${isEditing 
              ? "bg-black text-white hover:bg-zinc-800" 
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}
        >
          {isEditing ? "Save Changes" : "Edit Task"}
        </button>
    
        <button
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all
            bg-red-400 hover:bg-red-500 text-white`}
        >
          Delete Task
        </button>
      </div>
    </div>
  )
}