export default function createExamplesTemplate(name: string) {
  return `import * as React from "react";

import { default as ExamplesPage, ExampleList } from "components/ExamplesPage";

const examples: ExampleList = [];

const Examples = () => <ExamplesPage title="${name}" examples={examples} />;

export default Examples;
`;
}
