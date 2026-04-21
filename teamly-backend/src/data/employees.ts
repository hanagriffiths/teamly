export type Employee = {
    id: string,
    name: string,
    role: string,
    team: string
}

export const employees: Employee[] = [
    { id: "e1", name: "Sarah Thompson", role: "Frontend Engineer", team: "Platform" },
    { id: "e2", name: "James Smith", role: "Backend Engineer", team: "Platform" },
    { id: "e3", name: "Aisha Khan", role: "Product Designer", team: "Product" }
];
