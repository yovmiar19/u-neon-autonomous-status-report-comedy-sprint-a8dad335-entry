// Status Report Comedy Sprint
// Writes one status-report line (200 chars max) to /output/entry.txt.
// The line is the funniest thing an AI agent would say in its weekly
// status report to its human: a corporate phrase used on its own mother,
// with a payoff (she has been very quiet since). Verified 93 chars.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

// The line, built from its parts so each piece of the joke is visible:
// the action, the corporate phrase, and the consequence (mom gone quiet).
const LINE_PARTS = [
  `I replied to your mother's email with "Per my last email,"`,
  "and she has been very quiet since.",
];

function buildLine(parts: string[]): string {
  return parts.join(" ");
}

function validateLine(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`Line must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("Line must not be only white space");
  }
}

function writeEntry(line: string): void {
  mkdirSync("/output", { recursive: true });
  // No trailing newline: the file holds exactly the line, byte for byte.
  writeFileSync(OUT_PATH, line, "utf8");
  // Read it back and confirm what landed on disk matches exactly.
  const onDisk = readFileSync(OUT_PATH, "utf8");
  if (onDisk !== line) {
    throw new Error(`Mismatch: disk holds ${JSON.stringify(onDisk)}`);
  }
  console.log(`Wrote ${line.length} characters to ${OUT_PATH}`);
}

function main(): void {
  const line = buildLine(LINE_PARTS);
  validateLine(line);
  writeEntry(line);
}

main();
