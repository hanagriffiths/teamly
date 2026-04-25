type AIResponse = {
    summary: string;
    insights: string[];
    risk_level: "low" | "medium" | "high";
};

type AnalyticsProps = {
    selectedEmployees: string | string[],
    selectedTimeRange: string,
    logs: Log[]
};

type ChartProps = {
    logs: Log[];
};

type ChatProps = {
    loading: boolean,
    messages: Message[],
    handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => Promise<void>,
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
};

type Constants = {
    id: string,
    name: string
};

type FilterEmpProps = {
    selectedEmployee: string | string[],
    setSelectedEmployee: React.Dispatch<React.SetStateAction<string | string[]>>;
};

type FilterTimeProps = {
    selectedTimeRange: string,
    setSelectedTimeRange: React.Dispatch<React.SetStateAction<string>>;
};

type FiltersType = {
    employeeIds: string | string[];
    timeRange: string;
};

type Grouped = {
    [date: string]: {
      date: string;
      [employeeId: string]: string | number;
    };
};

type Log = {
    employeeId: string,
    date: string,
    mood: number,
    hoursOnline: number,
    tasksCompleted: number,
    meetings: number
};

type Message = {
    query: string;
    response: AIResponse | null;
};

type NavBarProps = {
    openSidebar: boolean;
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    handleNewChat: () => void;
    selectedEmployees: string | string[];
    setSelectedEmployees: React.Dispatch<React.SetStateAction<string | string[]>>;
    selectedTimeRange: string;
    setSelectedTimeRange: React.Dispatch<React.SetStateAction<string>>;
};

type StatCardProps = {
    title: string,
    stat: number
};

export type {
    AIResponse,
    AnalyticsProps,
    ChartProps,
    ChatProps,
    Constants,
    FilterEmpProps,
    FilterTimeProps,
    FiltersType,
    Grouped,
    Log,
    Message,
    NavBarProps,
    StatCardProps
}