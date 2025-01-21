"use client"
import { useEffect, useState } from "react";
import { Task, Tasks } from "../../types/globals.d";
import TasksSummary from "./TasksSummary";

export default function ToDoList({ tasks, tasksCompleted, tasksCount }: Tasks) {

    const [tasksData, setTasksData] = useState<Tasks>({tasks: [], tasksCompleted: 0, tasksCount: 0})

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
    
    
    
    
    

    return (
        <div className="mt-6 relative">
            {/* Create Task Button */}
            <button className="fixed left-1/2 -translate-x-1/2 bottom-[1085px] bg-toDoButtonBlue text-white py-2 px-4 rounded-md shadow-lg h-[52px] w-[736px]">
                Create Task +
            </button>
            
            <div className="max-w-3xl mx-auto">
                {/* Summary Section */}
                <TasksSummary tasksCompleted={tasksData.tasksCompleted} tasksCount={tasksData.tasksCount} />

                {/* Task List */}
                <ul className="mt-4 space-y-3">
                    {tasksData.tasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex items-center justify-between bg-[#262626] p-4 rounded-lg shadow-md h-[72px] w-full"
                        >
                            {/* Checkbox for completion */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    readOnly
                                    className="mr-3 w-6 h-6 border-2 border-gray-400 rounded-full cursor-pointer appearance-none checked:bg-blue-500 checked:border-blue-500"
                                />
                                <span className={task.completed ? "line-through text-gray-500" : "text-white"}>
                                    {task.title}
                                </span>
                            </div>

                            {/* Delete button */}
                            <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:text-red-700 font-bold text-xl">
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
