import OpenAI from "openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const embeddingsModel = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function getEmbedding(text: string): Promise<number[]> {
    try {
        const response = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: text
        });

        return response.data[0].embedding;
    } catch (error) {
        console.error("Embedding error", error);
        throw error
    }
}

export async function getEmbeddings(text: string[]): Promise<number[][]> {
    try {
        const response = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: text
        });

        return response.data.map(item => item.embedding);
    } catch (error) {
        console.error("Batch embedding error", error);
        throw error
    }
}
