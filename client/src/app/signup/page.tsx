"use client"

import Image from "next/image";
import {useState,FormEvent} from "react"
import {useMutation} from "@tanstack/react-query"
import {DataItem , userQuery} from "../api/userQuery"
import { useRouter } from "next/navigation";


export default function Signin() {
 const router = useRouter()
  const [username ,setUsername] = useState<string>("")
  const [email,setEmail] = useState<string>("")
  const [phone,setPhone] = useState<string>("")
  const [password,setPassword] = useState<string>("")
 
    
  const RegisterMutation = useMutation({
    mutationFn:async(payload:DataItem)=>{
      console.log("going to backend")
      return await userQuery.registerUser(payload)
    },
    onSuccess:(res)=>{
      console.log("successfully registered user",res)
      router.push("/signin")
    },
    onError:(error)=>{
      console.log("error in registering user",error)
    }
  })

  const handleFormSubmit = async(e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
    console.log("clicked")
  
    const payload ={
      name:username,
      email,
      phone,
      password
    }
   console.log("mutation")
    RegisterMutation.mutate(payload)
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen px-4">
  <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 shadow-xl p-8 space-y-6">
    
    <h2 className="text-2xl font-bold text-center text-zinc-800 dark:text-white">
      SignUp Form
    </h2>

    <form onSubmit={handleFormSubmit} method ="POST" className="space-y-4">
      
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Username
        </label>
        <input
        name="username"
          type="text"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          placeholder="Enter username"
          className="w-full rounded-xl border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Email
        </label>
        <input
        name="email"
          type="email"
           value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full rounded-xl border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Phone
        </label>
        <input
        name="contact"
          type="tel"
           value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          placeholder="Enter phone number"
          className="w-full rounded-xl border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Password
        </label>
        <input
        name="password"
          type="password"
           value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full rounded-xl border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
        />
      </div>

      <button
        type="submit"
          onClick={() => console.log("button clicked")}
        className="w-full rounded-xl bg-black text-white py-2 font-medium hover:bg-zinc-800 transition dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        Login
      </button>

    </form>
  </div>
</div>
  );
}
