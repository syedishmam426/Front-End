"use client"
import TaskForm from "./TaskForm";

export default function CreateTask() {
    const handleCreate = async (newTask: { title: string; color: string }) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });
        } catch (error) {
            console.error("Failed to create task", error);
        }
    };

    return <TaskForm mode="create" onSubmit={handleCreate} />;
}
