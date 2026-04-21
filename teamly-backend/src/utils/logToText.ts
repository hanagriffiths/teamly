/**
 * Convert a daily activity `Log` into a human-readable text block for prompts/embeddings.
 * @param log Daily activity log record to format.
 * @returns A trimmed, multi-line string summarizing the log and employee name.
 */
import { getNameFromId } from "./getNameFromId";
import { Log } from "../data/logs";

export function logToText(log: Log): string {
    const employeeName = getNameFromId(log.employeeId);
    
    return `
    Employee daily activity log:
    - Date: ${log.date}
    - Name: ${employeeName}
    - Mood Score : ${log.mood} out of 10
    - Hours worked online: ${log.hoursOnline}
    - Tasks completed: ${log.tasksCompleted}
    - Number of meetings: ${log.meetings}
    `.trim();
};
