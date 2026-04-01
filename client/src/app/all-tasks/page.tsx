"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { taskQuery } from "../api/taskQuery"
import TaskCard from "../../components/TaskCard"
import { TaskItem } from "../../types/task"

export default function AllTasks() {
  const { data: tasks, isLoading, isError } = useQuery({
    queryKey: ["allTasks"],
    queryFn: async () => {
      const res = await taskQuery.fetchTasks()
      return res.data.data
    },
  })

  if (isLoading) return <div className="p-8 text-center animate-pulse">Loading tasks...</div>
  if (isError) return <div className="p-8 text-red-500 text-center">Failed to fetch tasks.</div>

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900">Your Tasks</h2>
        <p className="text-zinc-500 text-sm">Manage and track your daily progress.</p>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks?.map((task: TaskItem) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  )
}

