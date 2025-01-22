"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Tasks } from "../../types/globals.d";
import TasksSummary from "./TasksSummary";
import Task from "./Task";
import Button from "../Button/Button";
import { sortCompletedTasksToBottom } from "../../utils/taskUtils";

export default function ToDoList({ tasks, tasksCompleted, tasksCount }: Tasks) {
    const router = useRouter();
    const [tasksData, setTasksData] = useState<Tasks>({ tasks: [], tasksCompleted: 0, tasksCount: 0 });

    useEffect(() => {
        setTasksData({
            tasks: sortCompletedTasksToBottom([...tasks]),
            tasksCompleted,
            tasksCount,
        });
    }, [tasks, tasksCompleted, tasksCount]);

    const handleDeleteTask = useCallback(async (id: string) => {
        const deletedTask = tasksData.tasks.find(task => task.id === id);
        if (!deletedTask) return;

        setTasksData(prev => ({
            ...prev,
            tasks: prev.tasks.filter(task => task.id !== id),
            tasksCount: prev.tasksCount - 1,
            tasksCompleted: deletedTask.completed ? prev.tasksCompleted - 1 : prev.tasksCompleted,
        }));

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete task");
        } catch (error) {
            console.error(error);
            alert("Failed to delete task. Please try again.");
            setTasksData(prev => ({
                ...prev,
                tasks: [...prev.tasks, deletedTask],
                tasksCount: prev.tasksCount + 1,
                tasksCompleted: deletedTask.completed ? prev.tasksCompleted + 1 : prev.tasksCompleted,
            }));
        }
    }, [tasksData.tasks]);

    const handleToggleCompleteTask = useCallback(async (id: string, completed: boolean) => {
        setTasksData(prev => {
            const updatedTasks = prev.tasks.map(task => task.id === id ? { ...task, completed: !completed } : task);
            return {
                ...prev,
                tasks: sortCompletedTasksToBottom(updatedTasks),
                tasksCompleted: updatedTasks.filter(task => task.completed).length,
            };
        });

        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: !completed }),
            });
        } catch (error) {
            console.error("Failed to update task status", error);
        }
    }, []);

    return (
        <div className="mt-6 relative">
            <span className="fixed left-1/2 -translate-x-1/2 bottom-[1085px]">
                <Button text="Create Task" onClick={() => router.push("/create-task")} iconSrc="/circled-plus.svg" iconAlt="Add Task" />
            </span>
            <div className="max-w-3xl mx-auto mt-[52px]">
                <TasksSummary tasksCompleted={tasksData.tasksCompleted} tasksCount={tasksData.tasksCount} />
                <ul className="mt-4 space-y-3">
                    {tasksData.tasks.map(task => (
                        <Task key={task.id} task={task} handleDelete={handleDeleteTask} handleComplete={handleToggleCompleteTask} />
                    ))}
                </ul>
            </div>
        </div>
    );
}
