"use client";
import { useSearchParams, useRouter } from "next/navigation";
import TaskForm from "./TaskForm";

export default function EditTask() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const task = {
        id: searchParams.get("id") || "",
        title: searchParams.get("title") || "",
        color: searchParams.get("color") || "",
    };

    const handleUpdate = async (updatedTask: { title: string; color: string }) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTask),
            });
            router.push("/");
        } catch (error) {
            console.error("Failed to update task", error);
        }
    };

    return <TaskForm mode="edit" initialTask={task} onSubmit={handleUpdate} />;
}
