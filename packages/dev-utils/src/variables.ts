import { combineAllFiles, copyStylesTemp, createScssVariables } from "./utils";

export async function variables(): Promise<void> {
  combineAllFiles();
  await copyStylesTemp();
  await createScssVariables();
}
