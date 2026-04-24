type Log = {
  employeeId: string;
  tasksCompleted: number;
  meetings: number;
};

const COLOURS = ["#8884d8", "#ffc658", "#ff7f7f"];

export function getActivityPerEmployee(logs: Log[]) {
  const grouped: Record<string, number> = {};

  logs.forEach(log => {
    const totalActivity = log.tasksCompleted + log.meetings;

    if (!grouped[log.employeeId]) {
      grouped[log.employeeId] = 0;
    }

    grouped[log.employeeId] += totalActivity;
  });

  return Object.entries(grouped).map(([employeeId, total], index) => ({
    employeeId,
    total,
    fill: COLOURS[index % COLOURS.length],
  }));
}