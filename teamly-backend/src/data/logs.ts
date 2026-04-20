export type Log = {
    employeeId: string,
    date: string,
    mood: number,
    hoursOnline: number,
    tasksCompleted: number,
    meetings: number
}

export const TODAY = "2026-04-14";

export const logs: Array<Log> = [
    // WEEK 1

    // Sarah (stable, slight dip mid-week)
    { employeeId: "e1", date: "2026-04-01", mood: 7, hoursOnline: 7, tasksCompleted: 6, meetings: 2 },
    { employeeId: "e1", date: "2026-04-02", mood: 7, hoursOnline: 8, tasksCompleted: 5, meetings: 3 },
    { employeeId: "e1", date: "2026-04-03", mood: 6, hoursOnline: 8, tasksCompleted: 5, meetings: 3 },
    { employeeId: "e1", date: "2026-04-04", mood: 6, hoursOnline: 7, tasksCompleted: 6, meetings: 2 },
    { employeeId: "e1", date: "2026-04-05", mood: 7, hoursOnline: 6, tasksCompleted: 7, meetings: 1 },
    { employeeId: "e1", date: "2026-04-06", mood: 7, hoursOnline: 6, tasksCompleted: 6, meetings: 1 },
    { employeeId: "e1", date: "2026-04-07", mood: 8, hoursOnline: 5, tasksCompleted: 7, meetings: 1 },

    // James (high performer, consistent)
    { employeeId: "e2", date: "2026-04-01", mood: 8, hoursOnline: 7, tasksCompleted: 7, meetings: 2 },
    { employeeId: "e2", date: "2026-04-02", mood: 8, hoursOnline: 7, tasksCompleted: 6, meetings: 2 },
    { employeeId: "e2", date: "2026-04-03", mood: 9, hoursOnline: 6, tasksCompleted: 8, meetings: 1 },
    { employeeId: "e2", date: "2026-04-04", mood: 8, hoursOnline: 6, tasksCompleted: 7, meetings: 1 },
    { employeeId: "e2", date: "2026-04-05", mood: 9, hoursOnline: 7, tasksCompleted: 9, meetings: 2 },
    { employeeId: "e2", date: "2026-04-06", mood: 8, hoursOnline: 6, tasksCompleted: 7, meetings: 1 },
    { employeeId: "e2", date: "2026-04-07", mood: 9, hoursOnline: 6, tasksCompleted: 8, meetings: 1 },

    // Aisha (early signs of overload)
    { employeeId: "e3", date: "2026-04-01", mood: 6, hoursOnline: 8, tasksCompleted: 4, meetings: 4 },
    { employeeId: "e3", date: "2026-04-02", mood: 6, hoursOnline: 9, tasksCompleted: 3, meetings: 5 },
    { employeeId: "e3", date: "2026-04-03", mood: 5, hoursOnline: 9, tasksCompleted: 3, meetings: 5 },
    { employeeId: "e3", date: "2026-04-04", mood: 5, hoursOnline: 10, tasksCompleted: 2, meetings: 6 },
    { employeeId: "e3", date: "2026-04-05", mood: 4, hoursOnline: 10, tasksCompleted: 2, meetings: 6 },
    { employeeId: "e3", date: "2026-04-06", mood: 4, hoursOnline: 11, tasksCompleted: 1, meetings: 7 },
    { employeeId: "e3", date: "2026-04-07", mood: 3, hoursOnline: 11, tasksCompleted: 1, meetings: 7 },


    // WEEK 2

    // Sarah (recovery / stable)
    { employeeId: "e1", date: "2026-04-08", mood: 7, hoursOnline: 6, tasksCompleted: 6, meetings: 1 },
    { employeeId: "e1", date: "2026-04-09", mood: 7, hoursOnline: 7, tasksCompleted: 5, meetings: 2 },
    { employeeId: "e1", date: "2026-04-10", mood: 8, hoursOnline: 6, tasksCompleted: 7, meetings: 1 },
    { employeeId: "e1", date: "2026-04-11", mood: 7, hoursOnline: 6, tasksCompleted: 6, meetings: 1 },
    { employeeId: "e1", date: "2026-04-12", mood: 8, hoursOnline: 5, tasksCompleted: 7, meetings: 1 },
    { employeeId: "e1", date: "2026-04-13", mood: 8, hoursOnline: 5, tasksCompleted: 8, meetings: 1 },
    { employeeId: "e1", date: "2026-04-14", mood: 8, hoursOnline: 5, tasksCompleted: 7, meetings: 1 },
  
    // James (very stable high performer)
    { employeeId: "e2", date: "2026-04-08", mood: 9, hoursOnline: 6, tasksCompleted: 8, meetings: 1 },
    { employeeId: "e2", date: "2026-04-09", mood: 8, hoursOnline: 6, tasksCompleted: 7, meetings: 1 },
    { employeeId: "e2", date: "2026-04-10", mood: 9, hoursOnline: 5, tasksCompleted: 9, meetings: 1 },
    { employeeId: "e2", date: "2026-04-11", mood: 8, hoursOnline: 6, tasksCompleted: 8, meetings: 1 },
    { employeeId: "e2", date: "2026-04-12", mood: 9, hoursOnline: 6, tasksCompleted: 9, meetings: 2 },
    { employeeId: "e2", date: "2026-04-13", mood: 9, hoursOnline: 5, tasksCompleted: 8, meetings: 1 },
    { employeeId: "e2", date: "2026-04-14", mood: 9, hoursOnline: 6, tasksCompleted: 9, meetings: 1 },
  
    // Aisha (clear burnout trend)
    { employeeId: "e3", date: "2026-04-08", mood: 3, hoursOnline: 11, tasksCompleted: 1, meetings: 7 },
    { employeeId: "e3", date: "2026-04-09", mood: 3, hoursOnline: 12, tasksCompleted: 1, meetings: 8 },
    { employeeId: "e3", date: "2026-04-10", mood: 2, hoursOnline: 12, tasksCompleted: 0, meetings: 8 },
    { employeeId: "e3", date: "2026-04-11", mood: 3, hoursOnline: 11, tasksCompleted: 1, meetings: 7 },
    { employeeId: "e3", date: "2026-04-12", mood: 2, hoursOnline: 12, tasksCompleted: 0, meetings: 8 },
    { employeeId: "e3", date: "2026-04-13", mood: 2, hoursOnline: 13, tasksCompleted: 0, meetings: 9 },
    { employeeId: "e3", date: "2026-04-14", mood: 1, hoursOnline: 13, tasksCompleted: 0, meetings: 9 }
];