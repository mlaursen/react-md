import { dist, es, lib, projectRoot, types } from "./paths";
import { clean, glob, time } from "./utils";

export default function packageClean(others: string[] = []): Promise<void> {
  return time(async () => {
    if (process.cwd() === projectRoot) {
      const dists = await glob("packages/*/+(es|lib|dist|types)");
      const builds = await glob("packages/*/*.tsbuildinfo");

      // just so it doesn't log if it's already been cleaned
      const next = await glob("packages/documentation/.next");

      return clean([...dists, ...builds, ...next]);
    }

    const builds = await glob("*.tsbuildinfo");
    const toRemove = [es, lib, dist, types, ...builds, ...others];
    return clean(toRemove);
  }, "clean");
}
