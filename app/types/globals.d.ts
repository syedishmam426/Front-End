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

export type TaskProps = {
    task: Task;
    handleDelete: any;
    handleComplete: any;
}

export type NewTask = {
    title: string | undefined;
    color: string | undefined
}


export type ButtonProps = {
    text: string;
    onClick: () => void;
    iconSrc?: string;
    iconAlt?: string;
    iconSize?: number;
}