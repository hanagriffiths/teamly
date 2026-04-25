import { useEffect, useRef } from "react";
import { FaCircleArrowRight } from "react-icons/fa6";
import type { Message } from "../../types";
import type { ChatProps } from "../../types";

const Chat = ({
    loading,
    messages,
    handleSubmit,
    search,
    setSearch,
}: ChatProps) => {
    const bottomRef = useRef<HTMLDivElement | null>(null);
        useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div
            className="flex flex-5 flex-col h-dvh bg-blue-100/40"
        >
            {messages.length > 0 ? (
                <div className="flex-1 overflow-y-auto w-full max-w-3xl mx-auto mt-10 px-12 pb-8">
                    {messages.map((msg: Message, index: number) => (
                        <div
                            key={index}
                            className="relative space-y-8 py-4"
                        >
                            <div className="w-full flex justify-end">
                                <p className="max-w-[50%] px-4 py-2 text-wrap bg-purple-200 text-purple-900 rounded-2xl">
                                    {msg.query}
                                </p>
                            </div>
                        
                            {msg.response ? (
                                <div className="w-full text-purple-950 max-w-[90%] space-y-4">
                                    <h1 className="font-semibold text-2xl">
                                        📈 Summary
                                    </h1>
                                    <p>{msg.response.summary}</p>

                                    <h1 className="font-semibold text-2xl">
                                        🔑 Key Insights
                                    </h1>
                                    <ul className="list-disc ml-4 space-y-2">
                                        {msg.response.insights.map((insight, idx) => (
                                            <li key={idx}>{insight}</li>
                                        ))}
                                    </ul>

                                    <span ref={bottomRef} className="text-sm">
                                        Risk: {msg.response.risk_level}
                                    </span>
                                </div>
                            ) : (
                                <div
                                    className="w-fit h-fit rounded-xl p-3 text-sm flex flex-row items-center gap-2"
                                >
                                    <div className="size-2 bg-purple-900/75 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <div className="size-2 bg-purple-900/75 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="size-2 bg-purple-900/75 rounded-full animate-bounce" />
                                </div>
                            )}
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

            <div className="w-full">
                <div className="w-full flex-centred py-2 px-12">
                    <form
                        className="w-full max-w-4xl py-4 px-8 flex-row gap-4 border border-purple-900 rounded-4xl bg-slate-50 shadow-md shadow-slate-400/50 flex items-center justify-between"
                        onSubmit={handleSubmit}
                    >
                        <input
                            className="w-full outline-none"
                            type='text'
                            placeholder='Who is most at risk of burnout in the last 7 days?'
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
    )
}

export default Chat;