export default function TasksSummary({ tasksCompleted, tasksCount }: { tasksCompleted: number, tasksCount: number }) {
    return (
        <div className="flex justify-between items-center mb-4 max-w-full font-bold">
            <h2 className="flex items-center gap-2 text-toDoTextBlue">
                Tasks 
                <span className="bg-[#333333] text-[#D9D9D9] rounded-full px-3 py-1 text-sm">
                    {tasksCount}
                </span>
            </h2>
            <h2 className="flex items-center gap-2 text-[#8284FA]">
                Completed 
                <span className="bg-[#333333] text-[#D9D9D9] rounded-full px-3 py-1 text-sm">
                    {tasksCompleted} of {tasksCount}
                </span>
            </h2>
        </div>
    );
}
