import { Anthropic } from "@anthropic-ai/sdk";
import logFilter from "./logFilter";

type RiskLevel = "low" | "medium" | "high";
type AIResponse = {
    summary: string;
    insights: string[];
    risk_level: RiskLevel;
};

export type AskAIResult =
    | { ok: true; data: AIResponse }
    | { ok: false; error: string };

async function askAI(query: string): Promise<AskAIResult> {
    const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const filteredData = logFilter(query);

    const prompt = `
    You are an HR analytics assistant.
    Return only valid JSON and do NOT wrap it in markdown or backticks.

    DATA:
    ${JSON.stringify(filteredData, null, 2)}

    Question: ${query}

    Please structure your response in the following format:
    {
        "summary": "string",
        "insights": ["string", "string", "string"],
        "risk_level": "low" | "medium" | "high"
    }

    Rules:
    - Be concise and base answers strictly on provided data.
    - "insights" must be 3–7 concise bullet-style strings (no newlines).
    - If the question cannot be answered from DATA, set "summary" to a brief explanation, set "insights" to [], and set "risk_level" to "low".
    - Do not include any additional keys.
    - If data is insufficient, say so clearly and avoid over-speculating.
    `;

    try {
        const response = await anthropic.messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 450,
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ]
        });

        const textRes = response.content[0].type === "text" ? response.content[0].text : "";

        try {
            const parsed = JSON.parse(textRes) as AIResponse;
            return { ok: true, data: parsed };
        } catch {
            if (textRes) console.warn("AI response was not valid JSON.", { textRes });
            return {
                ok: false,
                error: textRes
                    ? "AI response was not valid JSON."
                    : "AI response did not contain any text output.",
            };
        }
    } catch (error) {
        console.error("Error asking AI:", error);
        return { ok: false, error: "AI request failed." };
    }
}

export default askAI;
