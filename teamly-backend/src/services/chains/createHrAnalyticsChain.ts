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

export function createHrAnalyticsChain({
    retriever,
    prompt,
    model,
    parser,
}: HrChainDeps) {
    return {
        async invoke(query: string) {
            const retrievedDocs = await retriever.getRelevantDocuments(query);

            const formattedPrompt = await prompt.format({
                query: query,
                data: JSON.stringify(
                    retrievedDocs.map((doc: any) => doc.pageContent),
                    null,
                    2
                ),
                format_instructions: parser.getFormatInstructions(),
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