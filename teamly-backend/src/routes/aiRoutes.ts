import express from "express";
import askAI from "../services/ai/askAI";

const router = express.Router();

router.post("/ask", async (req, res) => {
    const query =
        typeof req.body?.query === "string" ? req.body.query : undefined;

    if (!query) {
        return res.status(400).json({
            error: "Query is required.",
        });
    }

    try {
        const response = await askAI(query);
        res.json(response);
    } catch (error) {
        console.error("Error asking AI:", error);
        throw error;
    }
});

export default router;
