import { createHrAnalyticsChain } from "./createHrAnalyticsChain";
import { anthropicModel } from "../models/anthropic";
import { hrAnalyticsPrompt } from "../prompts/hrAnalyticsPrompt";
import { aiOutputParser } from "../parsers/aiOutputParser";
import { buildLogRetriever } from "../retriever/buildLogRetriever";

export async function buildChain(filteredLogs: any[]) {
    const retriever = await buildLogRetriever(filteredLogs);

    return createHrAnalyticsChain({
        retriever,
        prompt: hrAnalyticsPrompt,
        model: anthropicModel,
        parser: aiOutputParser,
    });
}