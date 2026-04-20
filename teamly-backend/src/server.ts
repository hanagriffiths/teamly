import express from "express";
import aiRoutes from "./routes/aiRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// debugging
// app.use((req, res, next) => {
//   console.log("Incoming request:", req.method, req.url);
//   next();
// });

// Routes
app.use("/api", aiRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
