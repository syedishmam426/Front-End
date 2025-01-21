import Image from "next/image";
import { TaskProps } from './Task.d'

export default function ToDoList({task, handleDelete, handleComplete}: TaskProps) {
    return (
        <li
            key={task.id}
            className="flex items-center justify-between bg-[#262626] p-4 rounded-lg shadow-md h-[72px] w-full"
        >
            {/* Checkbox for completion */}
            <div className="flex items-center">
                <button onClick={() => handleComplete(task.id, task.completed)} className="mr-3">
                    <Image
                        src={task.completed ? "/checkbox-checked.svg" : "/checkbox-unchecked.svg"}
                        alt={task.completed ? "Completed" : "Incomplete"}
                        width={17}
                        height={17}
                    />
                </button>
                <span className={task.completed ? "line-through text-gray-500" : "text-white"}>
                    {task.title}
                </span>
            </div>

            {/* Delete button */}
            <button onClick={() => handleDelete(task.id)} className="p-2">
                <Image src="/trash.svg" alt="Delete" width={12.48} height={14} />
            </button>
        </li>
    );
}
