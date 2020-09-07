import { es, lib, dist } from "./constants";
import { clean as remove, glob } from "./utils";

export async function clean(): Promise<void> {
  const pattern = `packages/!(dev-utils|documentation)/@(${es}|${lib}|${dist}|*.tsbuildinfo)`;
  const files = await glob(pattern);

  return remove(files);
}
