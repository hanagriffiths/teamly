import dayjs from "dayjs";
import type { Grouped, Log } from "../types";


export function getMoodOverTime(logs: Log[]) {
  const grouped: Grouped = {};

  logs.forEach(log => {
    const date = dayjs(log.date).format("DD/MM");

    if (!grouped[date]) {
      grouped[date] = { date };
    }

    grouped[date][log.employeeId] = log.mood;
  });

  return Object.values(grouped);
}