import {
    Legend,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { getMoodOverTime } from "../../utils/moodOverTime";
import { employees } from "../../constants/employees";

const COLOURS = ["#8884d8", "#2791F5", "#ff7f7f"];

function MoodChart({ logs }) {
    const data = getMoodOverTime(logs);

    const employeeIds = [...new Set(logs.map(l => l.employeeId))] as string[];

    const employeeMap = Object.fromEntries(
        employees.map(emp => [emp.id, emp.name])
    );

    return (
        <div className="w-full h-[300px] min-h-0 text-xs">
            <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 100, height: 50 }}>
                <LineChart
                    data={data}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 10]} width={30} />
                    <Tooltip
                        formatter={(value: string, name: string) => [
                            value,
                            employeeMap[name as string] || name
                        ]}
                    />
                    <Legend formatter={(value) => employeeMap[value] || value} />

                    {employeeIds.map((id: string, index: number) => (
                        <Line
                            key={id}
                            type="monotone"
                            dataKey={id}
                            name={employeeMap[id] || id}
                            stroke={COLOURS[index % COLOURS.length]}
                            strokeWidth={2}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    ); 
}

export default MoodChart;
