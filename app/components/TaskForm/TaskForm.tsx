"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../Button/Button";

const COLOR_OPTIONS = [
    "#FF3B30", "#FF9500", "#FFCC00", "#34C759", "#007AFF",
    "#5856D6", "#AF52DE", "#FF2D55", "#A2845E"
];

interface TaskFormProps {
    mode: "create" | "edit";
    initialTask?: { id?: string; title: string; color: string };
    onSubmit: (task: { id?: string; title: string; color: string }) => Promise<void>;
}

export default function TaskForm({ mode, initialTask, onSubmit }: TaskFormProps) {
    const router = useRouter();
    const [task, setTask] = useState(initialTask || { title: "", color: COLOR_OPTIONS[0] });

    const handleSubmit = useCallback(async () => {
        await onSubmit(task);
        router.push("/");
    }, [task, onSubmit, router]);

    return (
        <div className="px-4 sm:px-6 md:px-8">
            {/* Back Button */}
            <Image
                onClick={() => router.push("/")}
                src="/left-arrow.svg"
                alt="Back"
                width={14}
                height={14}
                className="cursor-pointer"
            />

            {/* Title Input */}
            <div className="mt-16">
                <h2 className="text-[#4EA8DE] mb-4 text-sm font-bold">Title</h2>
                <input
                    type="text"
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    className="bg-[#262626] py-2 px-4 rounded-md shadow-lg h-[52px] w-full max-w-[736px] text-sm border border-[#333333]"
                    placeholder="Ex. Brush your teeth"
                    maxLength={150}
                />
            </div>

            {/* Color Picker (Preselect Current Color) */}
            <div className="mt-8">
                <h2 className="text-[#4EA8DE] mb-4 text-sm font-bold">Color</h2>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    {COLOR_OPTIONS.map((color) => (
                        <button
                            key={color}
                            className={`w-10 h-10 sm:w-[42px] sm:h-[42px] md:w-[52px] md:h-[52px] rounded-full border-2 
                        ${task.color === color ? "border-white" : "border-transparent"}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setTask({ ...task, color })}
                        />
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-16 flex items-center justify-center">
                <Button
                    text={mode === "edit" ? "Save" : "Add Task"}
                    onClick={handleSubmit}
                    iconSrc="/circled-plus.svg"
                    iconAlt="Submit Task"
                />
            </div>
        </div>

    );
}
