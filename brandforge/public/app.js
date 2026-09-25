let STAGES = [];
let ctx = {};

async function loadStages() {
  const res = await fetch("/api/stages");
  STAGES = await res.json();
  renderChips(-1);
}

function renderChips(activeIdx) {
  const el = document.getElementById("stageChips");
  el.innerHTML = STAGES.map((s, i) => {
    const cls = i < activeIdx ? "done" : i === activeIdx ? "active" : "";
    return `<span class="chip ${cls}">${s.label}</span>`;
  }).join("");
}

function addCard(title) {
  const log = document.getElementById("log");
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `<h3>${title}</h3><pre>Thinking...</pre>`;
  log.appendChild(div);
  div.scrollIntoView({ behavior: "smooth", block: "end" });
  return div.querySelector("pre");
}

async function runStage(idea, stage) {
  const res = await fetch("/api/stage", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ idea, stageKey: stage.key, context: ctx }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "stage failed");
  return data.text;
}

async function runWorkflow(idea) {
  document.getElementById("intake").style.display = "none";
  const statusEl = document.getElementById("status");

  for (let i = 0; i < STAGES.length; i++) {
    const stage = STAGES[i];
    renderChips(i);
    statusEl.textContent = `Running: ${stage.title}...`;
    const pre = addCard(stage.title);
    try {
      const text = await runStage(idea, stage);
      ctx[stage.key] = text;
      pre.textContent = text;
    } catch (e) {
      pre.textContent = "Error: " + e.message;
      statusEl.textContent = "Stopped due to an error.";
      return;
    }
  }
  renderChips(STAGES.length);
  statusEl.textContent = "Brand system complete.";
  document.getElementById("final").style.display = "block";
  document.getElementById("final").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("runBtn").addEventListener("click", () => {
  const idea = document.getElementById("ideaInput").value.trim();
  if (!idea) return;
  ctx = {};
  document.getElementById("log").innerHTML = "";
  runWorkflow(idea);
});

document.getElementById("restartBtn").addEventListener("click", () => {
  ctx = {};
  document.getElementById("log").innerHTML = "";
  document.getElementById("final").style.display = "none";
  document.getElementById("intake").style.display = "block";
  document.getElementById("ideaInput").value = "";
  document.getElementById("status").textContent = "";
  renderChips(-1);
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  const md = STAGES.map((s) => `## ${s.title}\n\n${ctx[s.key] || ""}\n`).join("\n");
  const blob = new Blob([`# Brand Kit\n\n${md}`], { type: "text/markdown" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "brand-kit.md";
  a.click();
});

loadStages();
