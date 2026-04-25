import { useState, useEffect } from "react";
import { getData, postData } from "../services/apiService";

import NavBar from "../components/NavBar";
import AnalyticsPanel from "../components/analytics/AnalyticsPanel";
import { getDateRange } from "../utils/dateRangeHelper";
import Chat from "../components/chat/Chat";

export type FiltersType = {
    employeeIds: "all" | string[];
    timeRange: string;
};

export type Log = {
    employeeId: string,
    date: string,
    mood: number,
    hoursOnline: number,
    tasksCompleted: number,
    meetings: number
}

type AIResponse = {
    summary: string;
    insights: string[];
    risk_level: "low" | "medium" | "high";
};
  
export type Message = {
    query: string;
    response: AIResponse | null;
 };

function HomePage() {
    const [search, setSearch] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [openSidebar, setOpenSidebar] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedEmployees, setSelectedEmployees] = useState<"all" | string[]>("all");
    const [selectedTimeRange, setSelectedTimeRange] = useState<string>("all");
    const [logs, setLogs] = useState<Log[]>([]);

    useEffect(() => {
        const load = async () => {
          await fetchLogs(selectedTimeRange, selectedEmployees);
        };
      
        load();
    }, [selectedEmployees, selectedTimeRange]);

    const fetchLogs = async (timeRange: FiltersType["timeRange"], employeeIdsState: FiltersType["employeeIds"]) => {
        try {
            setLoading(true);

            const range = getDateRange(timeRange);

            const start = range?.start
                ? encodeURIComponent(range.start.toISOString())
                : "all";

            const end = range?.end
                ? encodeURIComponent(range.end.toISOString())
                : "all";

            let employeeIds: string;

            if (employeeIdsState === "all") {
                employeeIds = "all";
            } else if (employeeIdsState.length > 0) {
                employeeIds = employeeIdsState.join(",");
            } else {
                employeeIds = "all";
            }

            const res = await getData(
                `/data/logs/?start=${start}&end=${end}&employeeIds=${employeeIds}`
            );
            setLogs(res.data);
        } catch (err) {
            console.error('Failed to fetch logs', err);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!search.trim) return;

        const userQuery = search;
        
        setMessages((prev) => [
            ...prev,
            {"query": userQuery, "response": null}
        ]);

        setSearch(""); 
        setLoading(true)
        
        try{
            const res = await postData("/ai/ask", {query: userQuery, userId: "test-user"});
            
            const data: AIResponse = res.data;

            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1].response = data
                return updated;
            });
        } catch (error) {
            console.error("Could not submit query.", error)
        } finally {
            setLoading(false);
        }
    };

    const handleNewChat = async () => {
        setSearch("");
        setMessages([]);

        await postData("/ai/clear-memory", {userId: "test-user"});
    }

    return (
        <div className="h-dvh w-full flex flex-row">
            <NavBar
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
                handleNewChat={handleNewChat}
                selectedEmployees={selectedEmployees}
                setSelectedEmployees={setSelectedEmployees}
                selectedTimeRange={selectedTimeRange}
                setSelectedTimeRange={setSelectedTimeRange}
            />

            <div className="w-full flex flex-row">
                <Chat
                    loading={loading}
                    messages={messages}
                    handleSubmit={handleSubmit}
                    search={search}
                    setSearch={setSearch}
                />

                <AnalyticsPanel
                    selectedEmployees={selectedEmployees}
                    selectedTimeRange={selectedTimeRange}
                    logs={logs}
                />
            </div>
        </div>
    )
}

export default HomePage;
