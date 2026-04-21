/**
 * Lookup an employee's display name from their ID.
 * @param employeeId Employee identifier to resolve.
 * @returns The employee name if found; otherwise a fallback "invalid ID" message.
 */
import { employees } from "../data/employees";

export function getNameFromId(employeeId: string): string {
    for (const employee of employees) {
        if (employeeId === employee.id)
            return employee.name;
    }
    return `Unknown employee: ${employeeId}`;
}
