# BrandForge AI

An AI-powered product that turns a single rough idea into a structured, launch-ready
brand system — through a **7-stage AI workflow**, not a one-shot prompt.

Built for the Inkloom-presented hackathon (We Code Coders).

## Why this isn't the "one-prompt trap"

Each stage below is a separate API call. The output of every stage is stored and passed
as explicit context into the next stage, so later stages reason on top of earlier
decisions instead of starting from zero. Stage 4 is a dedicated self-critique pass that
finds cliches/weak assumptions in stages 2-3 and fixes them before visuals or launch
copy are generated.

| # | Stage | Job |
|---|-------|-----|
| 1 | Discover (`understand`) | Extract problem, audience, constraints, value, open questions |
| 2 | Position (`position`) | Category, differentiator, value prop, competitive angle |
| 3 | Shape (`personality`) | Personality traits, traits to avoid, naming directions, tagline |
| 4 | Challenge (`challenge`) | Detects cliches / weak assumptions in stages 2-3, proposes fixes |
| 5 | Visualize (`visual`) | Typography, color mood, composition, imagery, concepts to avoid |
| 6 | Check (`consistency`) | Flags conflicts between name/voice/visuals, proposes fixes |
| 7 | Deliver (`launch`) | Landing headline, pitch, sample voice/social posts, brand summary |

Prompt definitions live in `server/prompts.js` — each is a small, labeled instruction,
not a mega-prompt. The chaining logic is in `server/index.js`.

## Architecture

```
brandforge/
  server/
    index.js     Express server + Anthropic API calls
    prompts.js   The 7 stage prompts + context chaining
  public/
    index.html   UI shell
    app.js       Calls /api/stage sequentially, renders each stage live
    style.css
  .env.example
  package.json
```

Frontend and backend are deliberately plain (no build step) so the demo is reliable —
judges score "working implementation" and a plain Express + vanilla JS stack has
the fewest points of failure during a live demo.

## Setup

```bash
git clone <your-repo-url>
cd brandforge
npm install
cp .env.example .env
# put your real Anthropic API key in .env
npm start
```

Open `http://localhost:3000`, type an idea, click **Run brand workflow**. Each stage
streams into its own card live. When done, click **Download brand kit** for a `.md`
export you can attach to your submission.

## API

- `GET /api/stages` — lists the 7 stages (name/title), so the architecture is
  inspectable, not hardcoded in the frontend.
- `POST /api/stage` — `{ idea, stageKey, context }` → runs one stage, returns its text.
  The frontend calls this once per stage, in order.
- `POST /api/full` — `{ idea }` → runs all 7 stages server-side in one call, returns the
  full context object. Useful as a CLI/backup demo path if you don't want to drive it
  through the browser.

## Deploying (for the "live product link" requirement)

Any Node host works (Render, Railway, Fly.io, a VPS). Steps are the same everywhere:
set `ANTHROPIC_API_KEY` as an environment variable, set the start command to
`npm start`, and expose port `$PORT`.

## Filling out the submission form

**Problem being solved:** Founders start with a single rough sentence, not a brand —
they still need to define audience, positioning, personality, naming, visuals, voice
and a launch message. BrandForge does that through a staged AI workflow instead of one
generic prompt.

**Distinctive / original features:**
- 7 explicitly staged prompts with context chaining (not one giant prompt)
- A dedicated self-critique stage that finds and fixes cliches before visuals/launch
  copy are generated
- A consistency-check stage that cross-validates name, voice and visual direction
  against each other and flags conflicts
- Exportable brand kit (`.md`) at the end

**Tech stack:** Node.js, Express, vanilla JS/HTML/CSS frontend, Anthropic API
(model configurable via `ANTHROPIC_MODEL`, default `claude-sonnet-5`).

**Prompt architecture / AI workflow:** See the stage table above — each stage is a
separate, labeled API call; each receives only the specific prior-stage outputs it
needs (not the full idea + everything), so context stays targeted per stage.

## Demo video script (2-4 min)

1. **Problem** (20s) — read the founder's-rough-sentence problem out loud.
2. **Product** (10s) — show the running UI.
3. **Input** (10s) — type a real idea.
4. **AI workflow** (60-90s) — narrate 2-3 stages as they stream, pointing at how stage 4
   critiques stage 3's output before visuals get generated.
5. **Output** (30s) — show the final brand kit + download.
6. **Difference** (20s) — call out the challenge/critique stage and the consistency
   check as the parts a plain "one-shot" tool doesn't do.
