import type { Log } from "../types";

export function getSummaryStats(logs: Log[]) {
    const totalEmployees = new Set(logs.map(log => log.employeeId)).size;

    const averageMood = Math.round((logs.reduce((sum, log) => sum + log.mood, 0) / logs.length) * 10) / 10;

    const averageHours = Math.round((logs.reduce((sum, log) => sum + log.hoursOnline, 0) / logs.length) * 10) / 10;

    const averageTasks = Math.round((logs.reduce((sum, log) => sum + log.tasksCompleted, 0) / logs.length) * 10) / 10;

    const averageMeetings = Math.round((logs.reduce((sum, log) => sum + log.meetings, 0) / logs.length) * 10) / 10;

    return {
        totalEmployees,
        averageMood,
        averageHours,
        averageTasks,
        averageMeetings
    }
}