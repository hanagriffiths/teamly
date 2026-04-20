import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore)

import { employees, Employee } from "../../data/employees";
import { logs, Log, TODAY } from "../../data/logs";

/**
 * Function to check whether the query explicitly mentions any employees by name.
 * @param formattedQuery is the given user query for the HR chatbot, formatted to lower case and with whitespace trimmed.
 * @returns a set containing any mentioned employees according to their ID.
 */
function filterNames(formattedQuery: string): Set<string> {
    const matchedEmployees: Set<string> = new Set();

    // iterate over list of employees checking if an employee name is in the query string
    // if it is, add all logs specific to that employee to the new log array
    for (let employee of employees) {
        const fullName = employee.name.toLowerCase().trim();
        const nameParts = fullName.split(" ");
        const firstName: string = nameParts[0];
        let surname: string;

        if (nameParts.length == 2) {
            surname = nameParts[1];
        } else {
            surname = nameParts[nameParts.length - 1];
        }


        if (formattedQuery.includes(fullName) || formattedQuery.includes(firstName) || formattedQuery.includes(surname)) {
            matchedEmployees.add(employee.id);
        }
    }

    // check if the Set is empty
    // if so, add all employees as default
    if (matchedEmployees.size === 0) {
        for (const employee of employees) {
            matchedEmployees.add(employee.id)
        }
    }

    return matchedEmployees;
}

type DateRange = {
    start: dayjs.Dayjs,
    end: dayjs.Dayjs
}

/**
 * Function to check whether the query mentions any specific date/ date ranges.
 * @param formattedQuery is the given user query for the HR chatbot, formatted to lower case and with whitespace trimmed.
 * @returns a date range according to the given user query.
 */
function filterDates(formattedQuery: string): DateRange {
    const today = dayjs(TODAY);

    if (formattedQuery.includes("today")) {
        return { start: today, end: today };
    }

    if (formattedQuery.includes("yesterday")) {
        return { start: today.subtract(1, "day"), end: today.subtract(1, "day") };
    }

    if (formattedQuery.includes("last week")) {
        const start = today.subtract(1, "week").startOf("week");
        const end = today.subtract(1, "week").endOf("week");
        return { start, end };
    }

    if (formattedQuery.includes("recent") || formattedQuery.includes("last few days")) {
        return { start: today.subtract(3, "day"), end: today };
    }
    
    // fallback to recent month
    return { start: today.subtract(1, "month"), end: today };
}

export default function logFilter(query: string): { selectedLogs: Log[], selectedEmployees: Employee[] } {
    const formattedQuery: string = query.toLowerCase().trim();
    const matchedEmployees: Set<string> = filterNames(formattedQuery);
    const dateRange: DateRange = filterDates(formattedQuery);

    const filteredLogs: Log[] = logs.filter(log => {
        const logDate = dayjs(log.date);

        return logDate.isSameOrAfter(dateRange.start) && logDate.isSameOrBefore(dateRange.end) && matchedEmployees.has(log.employeeId);
    })

    const filteredEmployees: Employee[] = employees.filter(employee => {
        return matchedEmployees.has(employee.id);
    })

    return { selectedLogs: filteredLogs, selectedEmployees: filteredEmployees }
}