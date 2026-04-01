"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {useSelector,useDispatch} from "react-redux"
import {removeUser} from "../store/reducer"
import { initialState } from "../store/reducer"
import Image from "next/image"
import {useMutation} from "@tanstack/react-query"
import {userQuery} from "../app/api/userQuery"

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [open,setOpen] = useState(false)

  const dispatch = useDispatch()

  const userId = useSelector((state:initialState)=>state.data._id)
  console.log("user id in navbar",userId)

  const removeCookieMutation = useMutation({
    mutationFn:async()=>{
        return await userQuery.signOutUser()
    },
    onSuccess:(res)=>{
        console.log("signout user successfully",res)
    },
    onError:(error)=>{
        console.log("error in signining out the user",error)
    }
  })
  const handleSignOut=()=>{
    removeCookieMutation.mutate()
  }

  const linkStyle = (path: string) => 
    `text-sm font-medium transition-colors hover:text-black ${
      pathname === path ? "text-black underline underline-offset-4" : "text-zinc-500"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
       
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-bg bg-black flex items-center justify-center">
             <span className="text-white font-bold text-xs">D</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-black">Dashboard</h1>
        </div>

        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={linkStyle("/")}>Home</Link>
          <Link href="/all-tasks" className={linkStyle("/all-tasks")}>All Tasks</Link>
          <Link href="/create-task" className={linkStyle("/create-task")}>Create Task</Link>
        <Link href="/my-task" className={linkStyle("/my-task")}>My-Task</Link>
        </div>

        {userId ? (
  <div className="relative">
    <button
      onClick={() => setOpen(!open)}
      className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-zinc-200 hover:border-black transition"
    >
      <Image
        src="/user.png"
        alt="profile"
        fill
        className="object-cover"
      />
    </button>

    {open && (
      <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg border border-zinc-200 py-2 z-50">
        <Link
          href="/profile"
          className="block px-4 py-2 text-sm hover:bg-zinc-100 transition"
        >
          Profile
        </Link>

        <button
          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-zinc-100 transition"
          onClick={() => {
            dispatch(removeUser())
            handleSignOut()
          }}
        >
          Logout
        </button>
      </div>
    )}
  </div>
) : (  <div className="flex items-center gap-3">
          <Link href="/signin">
            <button className="hidden sm:block px-4 py-2 text-sm font-medium text-zinc-600 hover:text-black transition">
              Sign In
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-5 py-2 text-sm font-medium bg-black text-white rounded-full hover:bg-zinc-800 shadow-sm transition-all active:scale-95">
              Get Started
            </button>
          </Link>
          
          
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Toggle Menu</span>
            <div className="w-6 h-0.5 bg-black mb-1"></div>
            <div className="w-6 h-0.5 bg-black"></div>
          </button>
        </div> 
       ) }
       
      </div>

      
      {isOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white px-6 py-4 flex flex-col gap-4">
          <Link href="/" className="text-zinc-600">Home</Link>
          <Link href="/tasks" className="text-zinc-600">All Tasks</Link>
        </div>
      )}
    </nav>
  )
}