import express from "express";
import askAI from "../services/askAI";

const router = express.Router();

router.post("/ask", async (req, res) => {
    const query =
        typeof req.body?.query === "string" ? req.body.query : undefined;

    const userId =
        typeof req.body?.userId === "string" ? req.body.userId : undefined;

    if (!query || !userId) {
        return res.status(400).json({ ok: false, error: "query and userId are required." });
    }

    try {
        const result = await askAI(query, userId);
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
