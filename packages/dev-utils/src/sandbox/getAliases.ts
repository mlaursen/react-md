import { CompilerOptions } from "typescript";
import { src } from "../constants";

export default function getAliases(compilerOptions: CompilerOptions): string[] {
  const aliases = Object.keys(compilerOptions.paths).map((name) => {
    if (!name.includes("@react-md")) {
      name = name.replace("/*", "");
    }

    return `${src}/${name}`;
  });
  aliases.push(`${src}/_variables.scss`);

  return aliases;
}
