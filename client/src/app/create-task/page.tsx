"use client";
import { useState,FormEvent } from "react";
import {useMutation} from "@tanstack/react-query"
import { taskQuery } from "../api/taskQuery";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { initialState } from "../../store/reducer";

export default function Task() {
  const [title, setTitle] = useState<string>("");
  // const [operation, setOperation] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [click, setClick] = useState<boolean>(false);

  const router = useRouter()
  const userId = useSelector((state:initialState)=>state.data._id)

  const createTaskMutation = useMutation({
    mutationFn:async(payload:{title:string,description:string,status:string,userId:string})=>{
      return await taskQuery.createTask(payload)
    },
    onSuccess:(res)=>{
      console.log("task created successfully",res)
      router.push("/my-task")
    },
    onError:(error)=>{
      console.log("error in creating task",error)
    }
  })

  const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const payload={
      title,description,status,userId
    }
    createTaskMutation.mutate(payload)
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-6 py-10 flex items-center justify-center">
      <form onSubmit={handleSubmit} method ="POST"  className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-zinc-800 mb-2">
          Task Manager
        </h1>

        <p className="text-center text-zinc-500 mb-8">
          Create, update, or manage your task details
        </p>

        <div className="space-y-6">
          {/* <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Task Type
            </label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="w-full border border-zinc-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select operation</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
            </select>
          </div> */}

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full border border-zinc-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="w-full border border-zinc-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-zinc-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button
            type="submit"
              onClick={() => setClick(true)}
              disabled={createTaskMutation.isPending}
              className={`flex-1 py-3 rounded-lg font-medium text-white transition ${
                click
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              Save Task
            </button>

            <button
              disabled={click}
              onClick={() => {
                setTitle("");
                setDescription("");
                // setOperation("");
                setStatus("");
              }}
              className="flex-1 py-3 rounded-lg border border-zinc-300 hover:bg-zinc-100 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}