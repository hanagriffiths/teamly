import { addToMemory, clearMemory, getTrimmedMemory } from "../memory/memoryService";
import { Message } from "../types/message";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

type HrChainDeps = {
    retriever: any;
    prompt: any;
    model: any;
    parser: any;
};

function extractText(content: any): string {
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
        return content.map((c) => c.text ?? "").join("");
    }
    return "";
}

// format messages in line with Langchain stds
function formatMessages(messages: Message[]) {
    return messages.map(message => {
        if (message.role === "user") {
            return new HumanMessage(message.content);
        }
        return new AIMessage(message.content);
    })
}

export function createHrAnalyticsChain({
    retriever,
    prompt,
    model,
    parser,
}: HrChainDeps) {
    return {
        async invoke(query: string, userId: string) {
            const retrievedDocs = await retriever.getRelevantDocuments(query);
            const history = getTrimmedMemory(userId)

            const formattedPrompt = await prompt.format({
                query: query,
                data: JSON.stringify(
                    retrievedDocs.map((doc: any) => doc.pageContent),
                    null,
                    2
                ),
                format_instructions: parser.getFormatInstructions(),
                chat_history: formatMessages(history)
            });

            try {
                const response = await model.invoke([
                    {
                        role: "user",
                        content: formattedPrompt,
                    },
                ])
        
                // normalise output to string
                const text = extractText(response.content);
        
                // parse and validate with Langchain
                const parsed = await parser.parse(text);

                addToMemory(userId, { role: "user", content: "query" });
                addToMemory(userId, { role: "assistant", content: parsed.summary });

                return {
                    ok: true,
                    data: parsed,
                };
            } catch (error) {
                console.error("Error asking AI:", error);
                
                return {
                    ok: false,
                    error: "askAI error: AI request failed."
                };
            }
        }
    }
}