import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: exactly one letter, A for coffee. No word, no explanation,
// no punctuation, no trailing newline — the gate reads 1 character.
const LETTER = "A";

function resolveOutDir(): string {
  return (
    process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_DIR || "/output"
  );
}

function writeEntry(letter: string, outDir: string): string {
  if (letter.length !== 1 || letter.trim().length === 0) {
    throw new Error("entry must be exactly one non-whitespace character");
  }
  if (letter !== "A" && letter !== "B") {
    throw new Error("entry must be A (coffee) or B (tea)");
  }
  const outFile = `${outDir}/entry.txt`;
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, letter, "utf8");
  const back = readFileSync(outFile, "utf8");
  if (back !== letter) {
    throw new Error("read-back mismatch: written file differs from the entry");
  }
  return outFile;
}

const outFile = writeEntry(LETTER, resolveOutDir());
console.log(`wrote ${LETTER} to ${outFile}`);
