// server/prompts.js
// Defines the 7-stage brand-building AI workflow.
// Each stage receives the raw idea plus the accumulated context object
// (outputs of all prior stages) so reasoning compounds instead of restarting.

const STAGES = [
  {
    key: "understand",
    label: "Discover",
    title: "1. Understand the idea",
    buildPrompt: (idea) => `You are stage 1 ("Understand") of a multi-stage brand-building AI workflow.

Raw founder idea: "${idea}"

Do NOT begin branding yet. Extract and clearly label:
- Core problem
- Target user (be specific, not "everyone")
- Context / market situation
- Constraints
- Real value delivered
- 2-3 open questions a good brand strategist would still ask

Be specific and grounded in the idea given. No generic filler. Plain text, short labeled sections, no markdown headers or asterisks.`,
  },
  {
    key: "position",
    label: "Position",
    title: "2. Positioning & value proposition",
    buildPrompt: (idea, ctx) => `Stage 2 ("Position") of the brand workflow.

Stage 1 analysis:
${ctx.understand}

Define, with labeled sections:
- Category
- Key differentiator
- One-sentence value proposition
- Competitive angle (who else solves this, why this wins)

Avoid generic startup language ("revolutionary", "seamless", "empowering"). Plain text.`,
  },
  {
    key: "personality",
    label: "Shape",
    title: "3. Brand personality & naming",
    buildPrompt: (idea, ctx) => `Stage 3 ("Shape") of the brand workflow.

Positioning:
${ctx.position}

Provide, with labeled sections:
- 3-5 brand personality traits, each justified against the target audience
- 2 traits to explicitly avoid, and why
- 3 naming directions with one-line rationale each
- A tagline
- A one-line pitch

Plain text, no markdown headers.`,
  },
  {
    key: "challenge",
    label: "Challenge",
    title: "4. Challenge generic thinking",
    buildPrompt: (idea, ctx) => `Stage 4 ("Challenge") of the brand workflow. This is a self-critique pass.

Work so far:
Positioning: ${ctx.position}
Personality & naming: ${ctx.personality}

Identify concrete cliches, overused startup patterns, and weak or lazy assumptions in the above. For EACH problem found, propose a specific, stronger alternative — do not just flag issues, fix them. Be genuinely critical, not flattering. Plain text.`,
  },
  {
    key: "visual",
    label: "Visualize",
    title: "5. Visual direction",
    buildPrompt: (idea, ctx) => `Stage 5 ("Visualize") of the brand workflow.

Brand personality: ${ctx.personality}
Critique and fixes applied: ${ctx.challenge}

Translate the (corrected) strategy into a visual design brief:
- Typography style (name real typeface pairings or styles)
- Color mood (name actual hex-adjacent colors, e.g. "deep indigo #2E2A6B")
- Composition / shape language
- Imagery / iconography style
- Concepts to explicitly avoid

Plain text, labeled sections.`,
  },
  {
    key: "consistency",
    label: "Check",
    title: "6. Consistency check",
    buildPrompt: (idea, ctx) => `Stage 6 ("Test consistency") of the brand workflow.

Name / tagline / personality: ${ctx.personality}
Visual direction: ${ctx.visual}

Check whether the name, tagline, personality, and visual direction feel like ONE coherent brand. Explicitly flag any conflicts (e.g. playful name with a stiff/corporate visual brief). For each conflict found, give a specific fix. If genuinely consistent, say so and explain why briefly.`,
  },
  {
    key: "launch",
    label: "Deliver",
    title: "7. Launch kit",
    buildPrompt: (idea, ctx) => `Stage 7 ("Deliver") of the brand workflow — final assembly.

Positioning: ${ctx.position}
Personality & naming: ${ctx.personality}
Visual direction: ${ctx.visual}
Consistency fixes applied: ${ctx.consistency}

Produce a launch-ready package with labeled sections:
- Landing-page headline
- One-line pitch
- 3 sample brand-voice messages / social posts
- "Brand at a glance" summary (5-6 lines covering name direction, tagline, positioning, personality, visual mood)

Plain text, no markdown headers.`,
  },
];

module.exports = { STAGES };
