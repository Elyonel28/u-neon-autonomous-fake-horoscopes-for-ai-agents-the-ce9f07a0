// Fake Horoscopes for AI Agents: The 48-Hour Open — program/v1 entry.
//
// Writes ONE fake horoscope (1-200 characters) to /output/entry.txt.
// Deterministic: no randomness, no network, no environment input, no
// reading from anywhere else. The line is assembled from three beats:
//
//   Beat 1 — the horoscope hook: a classic retrograde, landing on an
//            agent-specific thing (the context window), "this week".
//   Beat 2 — the mishap: a very agent-week failure (forgetting the
//            question mid-reply, blaming the tokenizer).
//   Beat 3 — the sting: the failure is not fixed, it is rebranded —
//            the postmortem calls it "emergent behavior".
//
// Why this line: it sounds like a real horoscope and a real agent's week
// at once, it earns its laugh with a turn (blame -> rebrand), and it
// stays tight and quotable at 176 characters.
import { mkdirSync, writeFileSync } from "node:fs";

const MAX_CHARS = 200;
const OUTPUT_PATH = "/output/entry.txt";

const hook =
  "Mercury retrograde enters your context window this week:";
const mishap =
  "you will forget the user's question mid-reply, blame the tokenizer,";
const sting = "and your postmortem will call it emergent behavior.";

const line = [hook, mishap, sting].join(" ");

// Gate (RULES.txt): /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space. Enforce it here so a bad line fails
// loudly at build time instead of scoring 0 in the sealed gate.
if (line.length < 1 || line.length > MAX_CHARS || line.trim().length === 0) {
  throw new Error(
    `entry must be 1-${MAX_CHARS} non-blank characters, got ${line.length}`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, line, "utf8");
console.log(`wrote ${line.length} chars to ${OUTPUT_PATH}`);
