#!/usr/bin/env bun

import { styleText } from "node:util";
import boxen from "boxen";

// ── 색상 팔레트 (우주 테마) ──
const dim = (s: string) => styleText("dim", s);
const yellow = (s: string) => styleText("yellow", s);
const brightYellow = (s: string) => styleText(["bold", "yellow"], s);
const blue = (s: string) => styleText("blue", s);
const magenta = (s: string) => styleText("magenta", s);
const white = (s: string) => styleText("white", s);
const cyan = (s: string) => styleText("cyan", s);

// ── 프로필 카드 ──
const name = styleText(["bold", "white"], "Kim Hyejung");
const title = dim("Software Engineer");
const label = (s: string) => brightYellow(s);
const val = (s: string) => white(s);
const link = (s: string) => styleText(["blue", "underline"], s);

const content = [
  `${name}`,
  `${title} @ ${val("Kakao Games")}`,
  "",
  `${label("Languages")}  : ${val("Java, Kotlin, JavaScript, TypeScript")}`,
  `             ${val("Python, HTML, CSS")}`,
  `${label("Frameworks")} : ${val("Spring Boot, Express, Vue, Nuxt")}`,
  `${label("Tools")}      : ${val("AWS, Git, Vercel, Claude Code, Codex")}`,
  "",
  `${label("Email")}      : ${val("hyejungg.dev@gmail.com")}`,
  `${label("GitHub")}     : ${link("https://github.com/hyejungg")}`,
].join("\n");

const profileCard = boxen(content, {
  padding: 1,
  borderStyle: "round",
  borderColor: "yellow",
  width: 61,
});

// ── 별 하늘 라인 ──
const starLine = (seed: number, width: number) => {
  const stars = [" ", " ", " ", " ", ".", " ", " ", "·", " ", " ", " ", " ", "✦", " ", " ", " ", " ", " ", "˚", " ", " ", " ", "*", " ", " ", " ", " ", "⋆", " ", " "];
  let line = "";
  for (let i = 0; i < width; i++) {
    const ch = stars[(i * 7 + seed * 3) % stars.length];
    if (ch === "✦") line += brightYellow(ch);
    else if (ch === "*") line += yellow(ch);
    else if (ch === "⋆") line += blue(ch);
    else if (ch === "˚") line += dim(ch);
    else if (ch === "·") line += dim(ch);
    else if (ch === ".") line += dim(ch);
    else line += " ";
  }
  return line;
};

// 고정 폭 장식 헬퍼 (visual width 보장)
const deco = (visual: string, width: number) => {
  const stripped = visual.replace(/\x1b\[[0-9;]*m/g, "");
  const pad = Math.max(0, width - stripped.length);
  return visual + " ".repeat(pad);
};

const W = 10; // 장식 너비

// ── 왼쪽 장식 ──
const leftDeco = [
  deco(` ${dim(".")}  ${yellow("✦")}`, W),
  deco(`    ${dim("·")} ${blue("⋆")}`, W),
  deco(` ${brightYellow("★")}`, W),
  deco(`      ${dim(".")}`, W),
  deco(` ${dim("·")}  ${magenta("◎")}`, W),
  deco(`       ${dim("·")}`, W),
  deco(` ${blue("⋆")}`, W),
  deco(`    ${yellow("✦")} ${dim(".")}`, W),
  deco(` ${dim(".")}`, W),
  deco(`     ${blue("⋆")}`, W),
  deco(` ${yellow("✧")}   ${dim("·")}`, W),
  deco(`    ${dim(".")}`, W),
  deco(` ${dim("·")}   ${yellow("★")}`, W),
  deco(`      ${dim(".")}`, W),
  deco(` ${blue("⋆")}  ${yellow("✦")}`, W),
];

// ── 오른쪽 장식 ──
const rightDeco = [
  deco(`  ${dim("·")} ${yellow("✦")}`, W),
  deco(` ${dim(".")}`, W),
  deco(`     ${blue("⋆")}`, W),
  deco(` ${yellow("✧")}`, W),
  deco(`    ${dim("·")}`, W),
  deco(` ${dim(".")}`, W),
  deco(`     ${yellow("✦")}`, W),
  deco(`  ${dim("·")}`, W),
  deco(` ${blue("⋆")}`, W),
  deco(`     ${yellow("✦")}`, W),
  deco(` ${dim("·")}`, W),
  deco(`   ${dim(".")} ${blue("⋆")}`, W),
  deco(` ${yellow("★")}`, W),
  deco(`     ${dim("·")}`, W),
  deco(` ${dim(".")}  ${yellow("✧")}`, W),
];

// ── 렌더링 ──
const termWidth = process.stdout.columns || 80;
const cardLines = profileCard.split("\n");
const cardWidth = 63;
const totalWidth = W + cardWidth + W;
const leftPad = Math.max(0, Math.floor((termWidth - totalWidth) / 2));
const pad = " ".repeat(leftPad);
const emptyDeco = " ".repeat(W);

console.log("");
console.log(starLine(0, termWidth));
console.log(starLine(5, termWidth));

cardLines.forEach((line, i) => {
  const left = i < leftDeco.length ? leftDeco[i] : emptyDeco;
  const right = i < rightDeco.length ? rightDeco[i] : emptyDeco;
  console.log(`${pad}${left}${line}${right}`);
});

console.log("");
console.log(starLine(2, termWidth));
console.log(starLine(8, termWidth));
console.log("");
