import { employees } from "../data/employees";

export function getNameFromId(employeeId: string): string {
    for (const employee of employees) {
        if (employeeId === employee.id)
            return employee.name;
    }
    return "Invalid employee ID given.";
}
