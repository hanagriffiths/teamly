import type { FiltersProps } from "../../types";

const Filters = ({
    title,
    allOptionTitle,
    options,
    selectedOption,
    setSelectedOption,
}: FiltersProps) => {
    const toggleOption = (id: string) => {
        // for time ranges, don't allow multi-select option
        if (id[0] === "t") {
            setSelectedOption(id);
            return;
        }

        if (selectedOption === "all") {
            setSelectedOption([id]);
            return;
        }

        // remove selection on double click
        // otherwise add to array
        // if this resets the selection to zero, default back to all
        if (typeof selectedOption === "object" && selectedOption.includes(id)) {
            const updated = selectedOption.filter(e => e !== id);
            setSelectedOption(updated.length ? updated : "all");
        } else {
            setSelectedOption([...selectedOption, id]);
        }

        console.log(selectedOption);
    };
    
    const selectAll = () => {
        setSelectedOption("all");
    };

    return (
        <div className="w-full p-2 flex flex-col gap-2">
            <h1 className="text-sm italic">
                {title}
            </h1>

            <div className="flex flex-col gap-1 text-sm">
                <div
                    onClick={selectAll}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <div
                        className={`
                            w-4 h-4 rounded-full border flex items-center justify-center
                            ${selectedOption === "all" ? "border-indigo-500" : "border-gray-400"}
                        `}
                    >
                        {selectedOption === "all" && (
                            <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        )}
                    </div>
                    <span>{allOptionTitle}</span>
                </div>

                {options.map(option => {
                    const isSelected =
                    selectedOption !== "all" &&
                    selectedOption.includes(option.id);

                    return (
                        <div
                            key={option.id}
                            onClick={() => toggleOption(option.id)}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                            ${isSelected ? "border-blue-500" : "border-gray-400"}`}
                            >
                            {isSelected && (
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                            )}
                            </div>
                            <span>{option.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Filters;
