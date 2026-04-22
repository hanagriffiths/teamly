import { Document } from "@langchain/core/documents";
import { Log } from "../../data/logs";
import { logToText } from "../../utils/logToText";
import { getEmbedding, getEmbeddings } from "../embedding/embedding";
import { cosineSimilarity } from "../../utils/cosineSimilarity";

const K = 5;

export async function buildLogRetriever(filteredLogs: Log[]) {
    if (filteredLogs.length === 0) {
        throw new Error("No matching logs for the given query/date range.");
    }
    
    // convert logs to docs
    const documents = filteredLogs.map((log) =>
        new Document({
            pageContent: logToText(log),
            metadata: {
                employeeId: log.employeeId,
                date: log.date,
            },
        })
    );

    // embed all docs
    const docsContent = documents.map(c => c.pageContent);
    const embeddings = await getEmbeddings(docsContent);

    const embeddedDocs = documents.map((document, i) => ({
        document,
        embedding: embeddings[i],
    }));

    // retriever object
    return {
        async getRelevantDocuments(query: string) {
            const queryEmbedding = await getEmbedding(query);

            const ranked = embeddedDocs.map((doc) => ({
                ...doc,
                score: cosineSimilarity(queryEmbedding, doc.embedding),
            }));

            return ranked
                .sort((a, b) => b.score - a.score)
                .slice(0, K)
                .map((item) => item.document);
        },
    };
}