import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.js";

const BASE_CODE = `
import "@react-md/core/test-utils/polyfills";
import "@react-md/core/test-utils/{FRAMEWORK}/setup";

// Optional: allow data-testid to be a valid DOM property for typescript
import "@react-md/core/test-utils/data-testid";

`;

export default function TestSetupCodeBlock(): ReactElement {
  return (
    <FrameworkCodeSwap
      lang="tsx"
      fileName="src/testSetup.ts"
      code={BASE_CODE}
    />
  );
}
