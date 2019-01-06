import fs from "fs-extra";
import { time } from "./utils";
import { es, lib, dist, types } from "./paths";

export default function clean() {
  return time(cleanDists, "clean");
}

function cleanDists() {
  return Promise.all([es, lib, dist, types].map(folder => fs.remove(folder)));
}
