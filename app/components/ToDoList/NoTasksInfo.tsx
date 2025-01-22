import Image from "next/image";

export default function NoTasksInfo() {
    return (
        <div className="flex flex-col items-center text-white text-center p-6 rounded-lg mt-16 gap-3">
            <Image
                src="/clipboard.svg"
                alt="Clipboard"
                width={56}
                height={56}
            />
            <h2 className="text-lg text-gray-400 font-bold">You don't have any tasks registered yet.</h2>
            <p className="text-sm text-gray-400">Create tasks and organize your to-do items</p>
        </div>
    );
}
