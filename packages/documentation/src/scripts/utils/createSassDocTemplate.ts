export default function createSassDocTemplate(name: string) {
  return `import * as React from "react";

import SassDocPage from "components/SassDocPage";

// const props = {};

const ${name}SassDoc = () => <SassDocPage name="${name}" />;

export default ${name}SassDoc;
`;
}
