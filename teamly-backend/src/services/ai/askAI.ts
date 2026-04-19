import { Anthropic } from "@anthropic-ai/sdk";
import { employees } from "../../data/employees";
import { logs } from "../../data/logs";

const formattedLogs = logs.map(log => 
    `${log.date} | ${log.employeeId} | mood: ${log.mood} | hours: ${log.hoursOnline} | tasksCompleted: ${log.tasksCompleted} | meetings: ${log.meetings}`
).join("\n");

async function askAI(query: string): Promise<object> {
    const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const prompt = `
    You are an HR analytics assistant.

    EMPLOYEE DATA:
    ${JSON.stringify(employees, null, 2)}

    LOGS:
    ${JSON.stringify(formattedLogs, null, 2)}

    Question: ${query}

    Please structure your response in the following format:
    {
        summary: "A brief summary of the query",
        keyInsights: ["A list of key insights from the query"],
        riskLevel: "The risk level of the query",
    }
    `;

    try {
        const response = await anthropic.messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 300,
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        return response.content;
    } catch (error) {
        console.error("Error asking AI:", error);
        throw error;
    }
}

export default askAI;
