"use client";
import { useEffect, useState } from "react";
import { Tasks } from "./types/globals.d";
import ToDoList from "./components/ToDoList/ToDoList";

export default function HomePage() {
  const [tasksApiResponse, setTasksApiResponse] = useState<Tasks>({ tasks: [], tasksCompleted: 0, tasksCount: 0 });

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
      const data = await res.json();
      setTasksApiResponse(data);
    }
    fetchTasks();
  }, []);

  const apiResponse: Tasks = {
    tasks: [
      { id: "1", title: "Task 1", color: "red", completed: true },
      { id: "2", title: "Task 2", color: "blue", completed: false },
    ],
    tasksCompleted: 1,
    tasksCount: 2,
  };

  return (
    <ToDoList {...apiResponse} />
  );
}
