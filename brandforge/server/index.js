// server/index.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const { STAGES } = require("./prompts");

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "..", "public")));

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

async function callGemini(prompt) {
  if (!API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is not set. Copy .env.example to .env and add your key."
    );
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 800 },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${errText}`);
  }
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
  return text;
}

// List the workflow stages (so the frontend, or judges, can see the architecture)
app.get("/api/stages", (req, res) => {
  res.json(STAGES.map(({ key, label, title }) => ({ key, label, title })));
});

// Run ONE stage. Frontend calls this sequentially so the UI can show
// each stage's result as it completes, and so the workflow is genuinely
// staged rather than a single giant prompt.
app.post("/api/stage", async (req, res) => {
  const { idea, stageKey, context } = req.body || {};
  if (!idea || !stageKey) {
    return res.status(400).json({ error: "idea and stageKey are required" });
  }
  const stage = STAGES.find((s) => s.key === stageKey);
  if (!stage) return res.status(400).json({ error: "unknown stageKey" });

  try {
    const prompt = stage.buildPrompt(idea, context || {});
    const text = await callGemini(prompt);
    res.json({ key: stage.key, title: stage.title, text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Run the FULL workflow server-side in one request (useful for a CLI demo
// or a backup path if the frontend isn't available).
app.post("/api/full", async (req, res) => {
  const { idea } = req.body || {};
  if (!idea) return res.status(400).json({ error: "idea is required" });

  const context = {};
  try {
    for (const stage of STAGES) {
      const prompt = stage.buildPrompt(idea, context);
      context[stage.key] = await callGemini(prompt);
    }
    res.json({ idea, context });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`BrandForge AI running at http://localhost:${PORT}`);
});
