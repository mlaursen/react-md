import copyStyles from "./utils/copyStyles";
import getSassdoc from "./utils/getSassdoc";
import { isVariableItem } from "./utils/sassdoc";
// import getCompiledScssVariables from "./utils/getCompiledScssVariables";

export default async function sassdoc(): Promise<void> {
  await copyStyles();

  const sassdocs = await getSassdoc();
  const variables = sassdocs.filter(isVariableItem);
  // const compiled = getCompiledScssVariables(variables);
  // console.log(compiled);
}
