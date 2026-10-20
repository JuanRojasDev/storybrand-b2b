// Builds the README illustrations: embeds the subset Tomorrow font and generates the story arc.
// Usage: node docs/src/build.mjs
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const src = dirname(fileURLToPath(import.meta.url));
const out = join(src, "..");

const font = readFileSync(join(src, "fonts", "Tomorrow-SemiBold-subset.woff")).toString("base64");
const fontFace = `@font-face { font-family: "Tomorrow SB"; font-weight: 600; src: url(data:font/woff;base64,${font}) format("woff"); }`;

// Seven pieces along a narrative arc
const pieces = [
  { x: 120, y: 340, kind: "client", name: "PERSONAJE", q: ["¿Qué quiere", "tu cliente?"] },
  { x: 275, y: 390, kind: "client", name: "PROBLEMA", q: ["¿Qué lo frena y", "cómo se siente?"] },
  { x: 430, y: 335, kind: "brand", name: "GUÍA", q: ["Empatía +", "autoridad"] },
  { x: 585, y: 305, kind: "brand", name: "PLAN", q: ["Tres pasos", "claros"] },
  { x: 740, y: 275, kind: "brand", name: "ACCIÓN", q: ["Un llamado", "concreto"] },
  { x: 895, y: 320, kind: "stake", name: "EN JUEGO", q: ["Qué pierde", "si no actúa"] },
  { x: 1070, y: 230, kind: "win", name: "ÉXITO", q: ["Cómo se ve", "el final feliz"] },
];

// Catmull-Rom spline through the points, as cubic Béziers
function arcPath(p) {
  const pts = [p[0], ...p, p[p.length - 1]];
  let d = `M ${p[0].x} ${p[0].y}`;
  for (let i = 1; i < pts.length - 2; i++) {
    const [a, b, c, e] = [pts[i - 1], pts[i], pts[i + 1], pts[i + 2]];
    const c1 = { x: b.x + (c.x - a.x) / 6, y: b.y + (c.y - a.y) / 6 };
    const c2 = { x: c.x - (e.x - b.x) / 6, y: c.y - (e.y - b.y) / 6 };
    d += ` C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${c.x} ${c.y}`;
  }
  return d;
}

const style = {
  client: { fill: "#0F4544", stroke: "#F3EFE4", num: "#F3EFE4" },
  brand: { fill: "#D4E56B", stroke: "none", num: "#0F4544" },
  stake: { fill: "#0F4544", stroke: "#F0897D", num: "#F0897D" },
  win: { fill: "#7DC79E", stroke: "none", num: "#0F4544" },
};

const nodes = pieces
  .map((p, i) => {
    const s = style[p.kind];
    const t = (0.5 + i * 0.28).toFixed(2);
    return `
  <g class="node" style="--t:${t}s">
    <circle cx="${p.x}" cy="${p.y}" r="24" fill="${s.fill}" stroke="${s.stroke}" stroke-width="3"/>
    <text x="${p.x}" y="${p.y + 7}" class="d" font-size="19" fill="${s.num}" text-anchor="middle">${i + 1}</text>
  </g>
  <g class="lab" style="--t:${t}s" text-anchor="middle">
    <text x="${p.x}" y="${p.y + 54}" class="d" font-size="17" fill="#F3EFE4" letter-spacing="0.5">${p.name}</text>
    <text x="${p.x}" y="${p.y + 76}" class="b" font-size="14" fill="#A8C6C0">${p.q[0]}</text>
    <text x="${p.x}" y="${p.y + 95}" class="b" font-size="14" fill="#A8C6C0">${p.q[1]}</text>
  </g>`;
  })
  .join("");

for (const file of readdirSync(src).filter((f) => f.endsWith(".svg"))) {
  const svg = readFileSync(join(src, file), "utf8")
    .replace("{{FONTFACE}}", fontFace)
    .replace("{{ARC}}", arcPath(pieces))
    .replace("{{NODES}}", nodes);
  writeFileSync(join(out, file), svg);
  console.log(`docs/${file}  ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB`);
}
