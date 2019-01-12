import path from "path";
import { Reflection } from "typedoc/dist/lib/models";

export function getFileSource(reflection: Reflection) {
  const [source] = reflection.sources;
  if (!source) {
    throw new Error(`Unable to get a source for reflection: ${reflection.name}`);
  }

  const path = (source.file && source.file.fullFileName) || source.fileName;
  return {
    line: source.line,
    path: path.replace(/.+react-md\//, ""),
  };
}
