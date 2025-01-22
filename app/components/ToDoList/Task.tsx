import Image from "next/image";
import Link from "next/link";
import { TaskProps } from "../../types/globals.d";

export default function ToDoList({ task, handleDelete, handleComplete }: TaskProps) {
    return (
        <li key={task.id} className="flex items-center justify-between bg-[#262626] p-4 rounded-lg shadow-md w-full">
            <Link
                href={`/edit-task?id=${task.id}&title=${encodeURIComponent(task.title)}&color=${encodeURIComponent(task.color)}`}
                className="flex items-center justify-between w-full px-4 py-2 min-w-0"
            >
                <div className="flex items-center min-w-0 w-full">
                    <button
                        onClick={(e) => { e.preventDefault(); handleComplete(task.id, task.completed); }}
                        className="mr-3"
                    >
                        <Image
                            src={task.completed ? "/checkbox-checked.svg" : "/checkbox-unchecked.svg"}
                            alt={task.completed ? "Completed" : "Incomplete"}
                            width={17}
                            height={17}
                        />
                    </button>
                    <span
                        className={`flex-1 min-w-0 break-words ${
                            task.completed ? "line-through text-gray-500" : "text-white"
                        }`}
                    >
                        {task.title}
                    </span>
                </div>
            </Link>

            {/* Delete button */}
            <button onClick={() => handleDelete(task.id)} className="p-2">
                <Image src="/trash.svg" alt="Delete" width={12.48} height={14} />
            </button>
        </li>
    );
}
