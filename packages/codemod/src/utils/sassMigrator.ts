import { runSassMigrator } from "./runSassMigrator.js";
import { type SassTransformer } from "./types.js";

export interface SassMigratorOptions {
  dry: boolean;
  files: readonly string[];
  version: string;
}

export async function sassMigrator(
  options: SassMigratorOptions
): Promise<void> {
  const { version } = options;

  const migration = await import(`../transforms/${version}/sass/all.js`).then(
    (mod: { default: SassTransformer }) => mod.default
  );
  await runSassMigrator({ ...options, migration });
}
