import { useState, useEffect } from "react";
import { getData } from "../../services/apiService";
import { FaCircleArrowRight } from "react-icons/fa6";

import NavBar from "../../components/NavBar";
import AnalyticsPanel from "../../components/AnalyticsPanel";
import { getDateRange } from "../../utils/dateRangeHelper";

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

function HomePage() {
    const [search, setSearch] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);
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

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        
        try{
           if (!search.trim()) return;
    
            setMessages((prev) => [...prev, search]);
            setSearch(""); 
        } catch (error) {
            console.error("Could not submit query. Please try again.")
        } finally {
            setLoading(false);
        }
    };

    const handleNewChat = () => {
        setSearch("");
        setMessages([]);
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
                <div
                    className="relative flex-5 min-h-dvh items-start bg-blue-100/40"
                >
                    {messages.length > 0 ? (
                        <div className="w-full max-w-3xl mx-auto mt-30 px-4 flex flex-col gap-3">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className="self-end bg-purple-200 text-purple-900 px-4 py-2 rounded-2xl max-w-[70%]"
                                >
                                    {msg}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full h-dvh px-2 flex-centred flex-col gap-4 text-center text-wrap">
                            <h1 className="text-4xl font-bold text-purple-900">
                                Welcome to Teamly!
                            </h1>
                            <p className="text-md text-purple-900/60">
                                Your personal HR helpbot. What would you like help with today?
                            </p>
                        </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0">
                        <div className="w-full flex-centred py-2 px-12">
                            <form
                                className="w-full max-w-4xl py-4 px-8 flex-row gap-4 border border-purple-900 rounded-4xl bg-slate-50 shadow-md shadow-slate-400/50 flex items-center justify-between"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    className="w-full outline-none"
                                    type='text'
                                    placeholder='What can I help you with today?'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    aria-label="Please enter the user query."
                                    disabled={loading}
                                />

                                <button className="hover:cursor-pointer">
                                    <FaCircleArrowRight
                                        className="w-8 h-8 text-purple-950"
                                    />
                                </button>
                            </form>
                        </div>
                        <div className="w-full flex-centred p-4">
                            <p className="text-sm text-slate-600/70 text-wrap">
                                Teamly can make mistakes. Check important info.
                            </p>
                        </div>
                    </div>
                </div>

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
