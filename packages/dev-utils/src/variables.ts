import { copyStylesTemp, createScssVariables } from "./utils";

export async function variables(): Promise<void> {
  await copyStylesTemp();
  await createScssVariables();
}
