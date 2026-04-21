import express from "express";
import askAI from "../services/ai/askAI";

const router = express.Router();

router.post("/ask", async (req, res) => {
    const query =
        typeof req.body?.query === "string" ? req.body.query : undefined;

    if (!query) {
        return res.status(400).json({ ok: false, error: "Query is required." });
    }

    try {
        const result = await askAI(query);
        if (result.ok) {
            return res.json(result);
        }
        // error if no candidates are present
        return res.status(422).json(result.error);
    } catch (error) {
        console.error("Error asking AI:", error);
        return res.status(500).json({ ok: false, error: "Internal server error." });
    }
});

export default router;
