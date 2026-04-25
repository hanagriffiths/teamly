import express from "express";
import cors from "cors";
import aiRoutes from "./routes/aiRoutes";
import dataRoutes from "./routes/dataRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// CORS security policy
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:4173", "https://teamly-beige.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Routes
app.use("/api/ai", aiRoutes);
app.use("/api/data", dataRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
