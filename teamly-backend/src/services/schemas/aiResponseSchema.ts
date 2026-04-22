import z from "zod";

export const aiResponseSchema = z.object({
    summary: z.string(),
    insights: z.array(z.string()),
    risk_level: z.enum(["low", "medium", "high"]),
});
