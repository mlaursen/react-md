import type { API, FileInfo, Options } from "jscodeshift";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  return root
    .find(j.Identifier)
    .forEach((path) => {
      switch (path.value.name) {
        case "Text":
          j(path).replaceWith(j.identifier("Typography"));
          break;
        case "TextProps":
          j(path).replaceWith(j.identifier("TypographyProps"));
          break;
        case "TextTypes":
          j(path).replaceWith(j.identifier("TypographyType"));
          break;
        case "TextElement":
          // this doesn't work for useRef<TextElement> for some reason..
          j(path).replaceWith(j.identifier("TypographyHTMLElement"));
          break;
        case "TextRenderFunction":
          j(path).replaceWith(j.identifier("TypographyRenderFunction"));
          break;
      }
    })
    .toSource(printOptions);
}
