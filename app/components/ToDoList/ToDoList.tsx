"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { Tasks } from "../../types/globals.d";
import TasksSummary from "./TasksSummary";
import Task from "./Task";

export default function ToDoList({ tasks, tasksCompleted, tasksCount }: Tasks) {

    const [tasksData, setTasksData] = useState<Tasks>({ tasks: [], tasksCompleted: 0, tasksCount: 0 })

    useEffect(() => {
        setTasksData({ tasks, tasksCompleted, tasksCount });
    }, [])

    const handleDelete = async (id: string) => {
        // Capture deleted task before updating state
        const deletedTask = tasksData.tasks.find(task => task.id === id);
        if (!deletedTask) return; // If task doesn't exist, exit early

        // Optimistically update state
        setTasksData(prevState => ({
            ...prevState,
            tasks: prevState.tasks.filter(task => task.id !== id),
            tasksCount: prevState.tasksCount - 1,
            tasksCompleted: deletedTask.completed ? prevState.tasksCompleted - 1 : prevState.tasksCompleted,
        }));

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete task");
        } catch (error) {
            console.error(error);
            alert("Failed to delete task. Please try again.");
            // Revert state if API request fails
            setTasksData(prevState => ({
                ...prevState,
                tasks: [...prevState.tasks, deletedTask],
                tasksCount: prevState.tasksCount + 1,
                tasksCompleted: deletedTask.completed ? prevState.tasksCompleted + 1 : prevState.tasksCompleted,
            }));
        }
    };

    const handleComplete = async (id: string, completed: boolean) => {
        setTasksData(prevState => {
            const updatedTasks = prevState.tasks.map(task =>
                task.id === id ? { ...task, completed: !completed } : task
            );

            // Sort: Move completed tasks to bottom
            updatedTasks.sort((a, b) => Number(a.completed) - Number(b.completed));

            return {
                ...prevState,
                tasks: updatedTasks,
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
    };



    return (
        <div className="mt-6 relative">
            {/* Create Task Button */}
            <button className="fixed left-1/2 -translate-x-1/2 bottom-[1085px] bg-toDoButtonBlue text-white py-2 px-4 rounded-md shadow-lg h-[52px] w-[736px]">
                Create Task +
            </button>

            <div className="max-w-3xl mx-auto mt-[52px]">
                {/* Summary Section */}
                <TasksSummary tasksCompleted={tasksData.tasksCompleted} tasksCount={tasksData.tasksCount} />

                {/* Task List */}
                <ul className="mt-4 space-y-3">
                    {tasksData.tasks.map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            handleDelete={handleDelete}
                            handleComplete={handleComplete}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}
