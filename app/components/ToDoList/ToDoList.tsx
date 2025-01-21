import { Tasks } from "../../types/globals.d";
import TasksSummary from "./TasksSummary";

export default function ToDoList({ tasks, tasksCompleted, tasksCount }: Tasks) {
    return (
        <div className="mt-6 relative">
            {/* Create Task Button */}
            <button className="absolute left-1/2 -translate-x-1/2 bottom-[145px] bg-toDoButtonBlue text-white py-2 px-4 rounded-md shadow-lg h-[52px] w-full">
                Create Task +
            </button>
            <div>
                {/* Summary Section */}
                <TasksSummary tasksCompleted={tasksCompleted} tasksCount={tasksCount} />

                {/* Task List */}
                <ul className="mt-4">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex items-center justify-between py-2"
                        >
                            {/* Checkbox for completion */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    readOnly
                                    className="mr-2 cursor-pointer"
                                />
                                <span
                                    className={task.completed ? "line-through text-gray-500" : ""}
                                >
                                    {task.title}
                                </span>
                            </div>

                            {/* Delete button */}
                            <button className="text-red-500 hover:text-red-700 font-bold">
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
