// One-Star Review of Something Essential
// Writes a single deadpan one-star review to $MAKEFUN_OUTPUT_DIR/entry.txt.
//
// The review: a complaint filed in earnest against oxygen — an everyday
// essential nobody can live without, priced at nothing, with no alternative
// supplier. The sting lands in the last few words.
//
// Gate (from the competition rules): /output/entry.txt must be UTF-8 text of
// 1 to 160 characters, not only white space, on a single line.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry. 83 characters, one line, no leading or trailing whitespace.
const ENTRY: string =
  "Oxygen: free, invisible, and impossible to live without. One star for the monopoly.";

const MAX_CHARS = 160;

function validateEntry(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // No control characters other than the ones already excluded above: the
  // file is plain printable text, one line, nothing hidden in it.
  for (const ch of text) {
    if (ch.codePointAt(0)! < 0x20) {
      throw new Error("entry must not contain control characters");
    }
  }
}

function main(): void {
  validateEntry(ENTRY);

  const outDir: string =
    process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });

  // Write exactly the review, no trailing newline: the gate counts the
  // file's characters, so the file holds precisely the 83-character line.
  const outPath: string = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");

  console.log(`wrote ${ENTRY.length} chars to ${outPath}`);
  console.log(ENTRY);
}

main();
