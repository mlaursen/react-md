import { exec } from "child_process";
import { promisify } from "util";

import { glob } from "./utils";

const execPromise = promisify(exec);

export async function sassMigrator(): Promise<void> {
  const files = await glob("packages/!(documentation)/src/**/*.scss");

  await Promise.all(
    files.map((file) => execPromise(`sass-migrator division ${file}`))
  );
}
