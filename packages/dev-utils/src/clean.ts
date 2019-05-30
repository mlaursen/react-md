import fs from "fs-extra";
import { es, lib, dist, types } from "./paths";
import { time, list, glob, clean } from "./utils";

export default function packageClean(others: string[] = []) {
  return time(async () => {
    const builds = await glob("*.tsbuildinfo");
    const toRemove = [es, lib, dist, types, ...builds, ...others];
    return clean(toRemove);
  }, "clean");
}
