import { Tasks } from "./types/globals.d";
import ToDoList from "./components/ToDoList/ToDoList";

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
    cache: "no-store",
  });

  const tasksApiResponse: Tasks = await res.json();

  return <ToDoList {...tasksApiResponse} />;
}
