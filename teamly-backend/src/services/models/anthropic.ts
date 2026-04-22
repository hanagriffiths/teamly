import { ChatAnthropic } from "@langchain/anthropic";
import dotenv from "dotenv";
dotenv.config();

export const anthropicModel = new ChatAnthropic({
    model: "claude-sonnet-4-6",
    maxTokens: 450,
    apiKey: process.env.ANTHROPIC_API_KEY,
});

