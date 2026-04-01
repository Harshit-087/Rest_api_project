"use client"

import {useMutation} from "@tanstack/react-query"
import {userQuery} from "../api/userQuery"
import Link from "next/link";
import {useState,FormEvent} from "react"
import {useRouter} from "next/navigation"
import {useDispatch} from "react-redux"
import {setUser} from "../../store/reducer"
import { AxiosResponse } from "axios";

type User={
  token:string,
  data:{
    _id:string
    name:string,
    email:string,
    role:string
  }
}

export default function LoginPage() {

  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
 const dispatch = useDispatch()
  const router = useRouter()

  const signinMutation = useMutation<AxiosResponse<User>, Error, {email:string,password:string}>({
  mutationFn:async(payload:{email:string,password:string})=>{
  return await userQuery.signinUser(payload)
  },
  onSuccess:(res:AxiosResponse<User>)=>{
    console.log("log in successfully",res)
    dispatch(setUser(res.data))
    router.push("/")
  },
  onError:(error)=>{
    console.log("error in signin in",error)
  }
  })

  const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
   const payload ={
    email,
    password
   }
   signinMutation.mutate(payload)
   window.location.href="/my-task"
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">

        <h2 className="text-2xl font-bold text-center text-black">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} method ="POST" className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>

            <input
              type="password"
               name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-black text-white hover:bg-zinc-800 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-sm text-zinc-500">
          Don’t have an account?{" "}
          <span className="text-black font-medium cursor-pointer">
           <Link href="/signup">Sign Up</Link> 
          </span>
        </p>

      </div>
    </div>
  );
}