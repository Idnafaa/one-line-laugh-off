// One-Line Laugh-Off — a single original joke, written to /output/entry.txt.
//
// The joke: a calendar reminder tells me to relax, and I treat relaxation
// like every other obligation — I snooze it. The twist is that the thing
// meant to save me from busyness gets filed away by the busyness itself.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My calendar reminded me to relax \u2014 I snoozed it until next month.";

function main(): void {
  const line = JOKE.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`joke must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("joke must be exactly one line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, line, "utf8");
  // Read back what we wrote: the judge reads exactly this file, so the
  // bytes on disk must be the joke and nothing else.
  const written = readFileSync(outPath, "utf8");
  if (written !== line) {
    throw new Error("entry.txt on disk does not match the joke");
  }
  console.log(`wrote ${line.length} characters to ${outPath}`);
}

main();
