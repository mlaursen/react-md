import fs from "fs-extra";
import { es, lib, dist, types } from "./paths";
import { time, list, log } from "./utils";

export default function clean(others: string[] = []) {
  const toRemove = [es, lib, dist, types, ...others];
  return time(() => {
    log("Cleaning the following directories/files:");
    log(list(toRemove));
    log();
    return Promise.all(toRemove.map(path => fs.remove(path)));
  }, "clean");
}
