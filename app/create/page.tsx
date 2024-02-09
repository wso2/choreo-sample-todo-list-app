"use client";

import React from "react";
import { redirect } from "next/navigation";

export default function CreatePage() {
  const [taskId, setTaskId] = React.useState("");
  const [taskLabel, setTaskLabel] = React.useState("");
  const [error, setError] = React.useState("");

  async function createTodo(formData: FormData) {
    const todo = {
      id: formData.get("id") as string,
      task: formData.get("task") as string,
    };
    try {
      await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 flex flex-col gap-y-4 items-center">
        <h1 className="text-3xl font-bold text-gray-700">Create ToDo</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form action={createTodo} className="mt-8">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="task-id"
            >
              Task ID:
            </label>
            <input
              name="id"
              required
              type="text"
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="task-label"
            >
              Task Label:
            </label>
            <input
              name="task"
              required
              type="text"
              value={taskLabel}
              onChange={(e) => setTaskLabel(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
