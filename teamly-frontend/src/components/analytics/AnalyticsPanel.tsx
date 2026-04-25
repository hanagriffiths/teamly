import { employees } from "../../constants/employees"
import { timeRanges } from "../../constants/timeRanges";
import { getSummaryStats } from "../../utils/summaryStats";
import { ActivityBarChart } from "./ActivityChart";
import MoodChart from "./MoodChart";
import StatCard from "../reusable/StatCard";

const AnalyticsPanel = ({
    selectedEmployees,
    selectedTimeRange,
    logs
}) => {
    const logStats = getSummaryStats(logs);

    const getEmployeeNames = () => {
        const employeeNames = [];
        if (selectedEmployees === "all") return "all employees";

        for (const empId of selectedEmployees) {
            for (const entry of employees) {
                if (entry["id"] === empId) employeeNames.push(entry.name);
            }
        }

        return employeeNames.join(", ");
    }

    const getTimeRange = () => {
        if (selectedTimeRange === "all") return "all time";

        for (const timeRange of timeRanges) {
            if (timeRange["id"] === selectedTimeRange) return timeRange.name.toLowerCase();
        }
    }

    return (
        <div
            className="flex-3 min-h-0 overflow-y-auto bg-indigo-100/50 border-l border-purple-950/20 text-purple-950"
        >
            <div className="w-full flex-1 min-h-0 overflow-y-auto flex flex-col gap-6 items-center py-8 px-10">
                <div className="w-full space-y-1.5 px-4 py-3 bg-purple-800/5 rounded-xl">
                    <h1 className="text-[22px] font-medium">
                        Employee Overview
                    </h1>

                    <p className="text-[13px] opacity-80">
                        Your current employee summary for {getEmployeeNames()} for {getTimeRange()}.
                    </p>
                </div>

                <div className="w-full space-y-2.5">
                    <div className="w-full grid grid-cols-2 gap-2">
                        <StatCard
                            title="Average Mood Rating"
                            stat={logStats.averageMood}
                        />
                        <StatCard
                            title="Average Tasks Completed"
                            stat={logStats.averageTasks}
                        />
                    </div>
                    <div className="w-full grid grid-cols-2 gap-2">
                        <StatCard
                            title="Average Hours Worked"
                            stat={logStats.averageHours}
                        />
                        <StatCard
                            title="Average Daily Meetings"
                            stat={logStats.averageMeetings}
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col gap-2 pt-8">
                    <h1 className="w-full text-center italic underline underline-offset-2 text-lg">
                        Mood Summary
                    </h1>

                    <MoodChart logs={logs} />
                </div>

                {/* <div className="w-full flex flex-col gap-2 pt-8"> */}
                <div className="w-full flex flex-col gap-2 pt-8 flex-1 min-h-0 overflow-y-auto">
                    <h1 className="w-full text-center italic underline underline-offset-2 text-lg">
                        Activity Summary
                    </h1>

                    <ActivityBarChart logs={logs} />
                </div>
            </div>
        </div>
    )
}

export default AnalyticsPanel