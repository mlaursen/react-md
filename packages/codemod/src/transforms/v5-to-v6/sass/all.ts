import { type Root } from "postcss";

import { type SassTransformer } from "../../../utils/types.js";
import { declarations } from "./declarations.js";
import { dependencies } from "./dependencies.js";
import { mixins } from "./mixins.js";

const MIGRATIONS: readonly SassTransformer[] = [
  dependencies,
  declarations,
  mixins,
];

export default function all(root: Root): boolean {
  let changed = false;
  MIGRATIONS.forEach((migration) => {
    const result = migration(root);
    changed ||= result;
  });

  return changed;
}
