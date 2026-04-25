import dayjs from "dayjs";
import type { Log } from "../pages/HomePage";

export function getMoodOverTime(logs: Log[]) {
  const grouped = {};

  logs.forEach(log => {
    const date = dayjs(log.date).format("DD/MM");

    if (!grouped[date]) {
      grouped[date] = { date };
    }

    grouped[date][log.employeeId] = log.mood;
  });

  return Object.values(grouped);
}