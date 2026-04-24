

const StatCard = ({
    title,
    stat,
}) => {
    return (
        <div className="w-full flex items-center justify-evenly flex-col h-28 rounded-xl bg-purple-800/10 p-4 border border-purple-950/15 shadow-sm/15">
            <h1 className="text-sm font-light">
                {title}
            </h1>
            <h1 className="text-3xl font-bold">
                {stat.toString()}
            </h1>
        </div>
    )
}

export default StatCard