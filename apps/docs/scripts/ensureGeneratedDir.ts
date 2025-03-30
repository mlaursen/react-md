import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";

import { GENERATED_DIR } from "./constants.js";

export async function ensureGeneratedDir(): Promise<void> {
  if (!existsSync(GENERATED_DIR)) {
    await mkdir(GENERATED_DIR, { recursive: true });
  }
}
