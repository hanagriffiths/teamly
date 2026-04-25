import type { FilterTimeProps, FilterEmpProps } from "../../types";
import { employees } from "../../constants/employees";
import { timeRanges } from "../../constants/timeRanges";

export const FilterTime = ({
    selectedTimeRange,
    setSelectedTimeRange,
}: FilterTimeProps) => {
    const selectAll = () => {
        setSelectedTimeRange("all");
    };

    return (
        <div className="w-full p-2 flex flex-col gap-2">
            <h1 className="text-sm italic">
                Time Ranges:
            </h1>

            <div className="flex flex-col gap-1 text-sm">
                <div
                    onClick={selectAll}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <div
                        className={`
                            w-4 h-4 rounded-full border flex items-center justify-center
                            ${selectedTimeRange === "all" ? "border-indigo-500" : "border-gray-400"}
                        `}
                    >
                        {selectedTimeRange === "all" && (
                            <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        )}
                    </div>
                    <span>All Time</span>
                </div>

                {timeRanges.map(range => {
                    const isSelected =
                    selectedTimeRange !== "all" &&
                    selectedTimeRange.includes(range.id);

                    return (
                        <div
                            key={range.id}
                            onClick={() => setSelectedTimeRange(range.id)}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                            ${isSelected ? "border-blue-500" : "border-gray-400"}`}
                            >
                            {isSelected && (
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                            )}
                            </div>
                            <span>{range.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}


export const FilterEmp = ({
    selectedEmployee,
    setSelectedEmployee,
}: FilterEmpProps) => {
    const toggleOption = (id: string) => {
        if (selectedEmployee === "all") {
            setSelectedEmployee([id]);
            return;
        }

        // remove selection on double click
        // otherwise add to array
        // if this resets the selection to zero, default back to all
        if (typeof selectedEmployee === "object" && selectedEmployee.includes(id)) {
            const updated = selectedEmployee.filter(e => e !== id);
            setSelectedEmployee(updated.length ? updated : "all");
        } else {
            setSelectedEmployee([...selectedEmployee, id]);
        }
    };
    
    const selectAll = () => {
        setSelectedEmployee("all");
    };

    return (
        <div className="w-full p-2 flex flex-col gap-2">
            <h1 className="text-sm italic">
                Employees:
            </h1>

            <div className="flex flex-col gap-1 text-sm">
                <div
                    onClick={selectAll}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <div
                        className={`
                            w-4 h-4 rounded-full border flex items-center justify-center
                            ${selectedEmployee === "all" ? "border-indigo-500" : "border-gray-400"}
                        `}
                    >
                        {selectedEmployee === "all" && (
                            <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        )}
                    </div>
                    <span>All Employees</span>
                </div>

                {employees.map(emp => {
                    const isSelected =
                    selectedEmployee !== "all" &&
                    selectedEmployee.includes(emp.id);

                    return (
                        <div
                            key={emp.id}
                            onClick={() => toggleOption(emp.id)}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                            ${isSelected ? "border-blue-500" : "border-gray-400"}`}
                            >
                            {isSelected && (
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                            )}
                            </div>
                            <span>{emp.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
