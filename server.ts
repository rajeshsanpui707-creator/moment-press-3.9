import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// API health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Serve static assets from Vite build output directory
const distPath = path.resolve(__dirname, "dist");
app.use(express.static(distPath));

// Fallback to index.html for client-side routing (SPA)
app.get("*", (_req, res) => {
  res.sendFile(path.resolve(distPath, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});
