export default function createSassDocTemplate(name: string) {
  return `import * as React from "react";

import { IFlattenedSassDoc } from "types/sassdoc";
import PackageSassDoc from "components/PackageSassDoc";

const sassdoc = require("./sassdoc.json") as IFlattenedSassDoc;

const ${name}SassDoc = () => <PackageSassDoc name="${name}" sassdoc={sassdoc} />;

export default ${name}SassDoc;
`;
}
