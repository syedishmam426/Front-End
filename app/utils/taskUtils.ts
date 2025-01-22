import { Task } from "../types/globals.d"

export const sortCompletedTasksToBottom = (tasks: Task[]) => {
    return tasks.sort((a, b) => Number(a.completed) - Number(b.completed));
}