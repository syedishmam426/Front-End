export type Task = {
    id: string;
    title: string;
    color: string;
    completed: boolean;
}

export type Tasks = {
    tasks: Task[];
    tasksCompleted: number;
    tasksCount: number;
}