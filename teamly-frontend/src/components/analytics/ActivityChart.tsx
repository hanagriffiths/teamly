import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { employees } from "../../constants/employees";
import { getActivityPerEmployee } from "../../utils/activityOverTime";
import type { ChartProps } from "../../types";

export function ActivityBarChart({ logs }: ChartProps) {
  const data = getActivityPerEmployee(logs);

  const employeeMap = Object.fromEntries(
    employees.map(emp => [emp.id, emp.name])
  );

  return (
    <div className="w-full h-[300px] min-h-[300px] text-xs">
      <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 100, height: 50 }}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          barCategoryGap="40%"
        >
          <XAxis
            dataKey="employeeId"
            tickFormatter={(id) => employeeMap[id] || id}
            interval={0}
          />
          <YAxis width={40} />
          <Tooltip
            formatter={(
              value: unknown,
              name: unknown,
              props: any
            ): [string | number, string] => {
              const safeValue =
                typeof value === "number" || typeof value === "string"
                  ? value
                  : "-";

              const safeName = typeof name === "string" ? name : "unknown";

              return [
                safeValue,
                employeeMap?.[props?.payload?.employeeId] || safeName
              ];
            }}
          />

          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
