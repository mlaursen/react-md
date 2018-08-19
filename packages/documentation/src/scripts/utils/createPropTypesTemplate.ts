export default function createPropTypesTemplate(name: string) {
  return `import * as React from "react";

import PropTypesPage from "components/PropTypesPage";

// const props = {};

const ${name}PropTypes = () => <PropTypesPage name="${name}" />;

export default ${name}PropTypes;
`;
}
