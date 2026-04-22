import { Message } from "../types/message";

const memoryStore: Record<string, Message[]> = {};

export function getMemory(userId: string): Message[] {
    return memoryStore[userId] || [];
}

export function addToMemory(userId: string, message: Message) {
    if (!memoryStore[userId]) {
        memoryStore[userId] = [];
    }

    memoryStore[userId].push(message);
}

export function getTrimmedMemory(userId: string, limit = 10): Message[] {
    const history = getMemory(userId);
    return history.slice(-limit);
}

export function clearMemory(userId: string) {
    memoryStore[userId] = [];
}