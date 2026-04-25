export type Constants = {
    id: string,
    name: string
}

export type FiltersType = {
    employeeIds: "all" | string[];
    timeRange: string;
};

export type FiltersProps = {
    title: string,
    allOptionTitle: string,
    options: Constants[],
    selectedOption: string | string[],
    setSelectedOption: React.Dispatch<React.SetStateAction<string[] | string>>,
}

export type Log = {
    employeeId: string,
    date: string,
    mood: number,
    hoursOnline: number,
    tasksCompleted: number,
    meetings: number
}

export type ChartProps = {
    logs: Log[];
};

export type AIResponse = {
    summary: string;
    insights: string[];
    risk_level: "low" | "medium" | "high";
};
  
export type Message = {
    query: string;
    response: AIResponse | null;
};

export type NavBarProps = {
    openSidebar: boolean;
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    handleNewChat: () => void;
    selectedEmployees: "all" | string[];
    setSelectedEmployees: React.Dispatch<React.SetStateAction<string[]>>;
    selectedTimeRange: string;
    setSelectedTimeRange: React.Dispatch<React.SetStateAction<string>>;
};

export type AnalyticsProps = {
    selectedEmployees: "all" | string[],
    selectedTimeRange: string,
    logs: Log[]
}

export type ChatProps = {
    loading: boolean,
    messages: Message[],
    handleSubmit: () => void,
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
}

export type StatCardProps = {
    title: string,
    stat: number
}