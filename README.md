# BrandForge AI 🚀

> Turn a single rough idea into a structured, launch-ready brand system — powered by a multi-stage AI workflow, not a one-shot prompt.

Built for the **Inkloom-presented We Code Coders Hackathon**.

---

## 📌 Problem Statement
Founders, creators, and developers often start with a single rough sentence (e.g., *"I want to create an app that helps students find teammates"*). While the idea may be valid, it is not yet a brand. Turning that idea into a market-ready identity requires defining target audiences, core positioning, brand personality, memorable names, visual directions, brand voice, and launch copy.

Relying on a single giant prompt ("the one-prompt trap") often produces generic, superficial text. **BrandForge AI** solves this by breaking the brand development process into **7 distinct, sequential reasoning stages**. The output of each stage is preserved and passed into subsequent stages as structured context, ensuring every step builds directly on top of previous strategic decisions.

---

## ✨ Key Features & AI Workflow

BrandForge AI features a 7-stage prompt pipeline designed for depth, coherence, and practical output:

1. **Discover (`understand`):** Extracts core problems, target user personas, context, constraints, and value proposition.
2. **Position (`position`):** Establishes market category, key differentiators, value proposition, and competitive angle.
3. **Shape (`personality`):** Generates 3–5 core brand personality traits, traits to avoid, naming directions, taglines, and messaging hierarchy.
4. **Challenge (`challenge`) - Anti-Generic Engine:** A dedicated self-critique pass that scans for startup clichés, buzzwords, and weak assumptions, providing stronger alternatives before visual or launch copy generation.
5. **Visualize (`visual`):** Translates strategic choices into visual identity guidelines including typography, color palette, logo concepts, and visual styles to avoid.
6. **Check (`consistency`) - Consistency Guardian:** Cross-evaluates the generated name, tagline, voice, visual identity, and messaging for internal contradictions, flagging and resolving mismatches.
7. **Deliver (`launch`):** Produces launch assets including a landing page headline, elevator pitch, social media announcement posts, and a full brand summary.

### 📄 Exportable Output
Upon workflow completion, the entire brand system compiles into a single, clean `.md` Markdown file. Users can download their complete **`brand-kit.md`** with a single click.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6)
* **Backend:** Node.js, Express.js
* **AI Model & API:** Google Gemini API (`gemini-2.5-flash` / `gemini-3.5-flash-lite`)
* **Environment Configuration:** `dotenv`

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+ recommended)
* A Google Gemini API Key (from [Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/dhokanekrushna467-web/Brandforge-AI.git](https://github.com/dhokanekrushna467-web/Brandforge-AI.git)
   cd Brandforge-AI
Install dependencies:

Bash
npm install
Configure Environment Variables:
Copy .env.example to .env:

Bash
cp .env.example .env
Open .env and insert your Gemini API Key:

Code snippet
GEMINI_API_KEY=your_actual_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
PORT=3000
Start the application:

Bash
npm start
Open http://localhost:3000 in your browser.
