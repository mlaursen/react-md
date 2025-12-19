import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.jsx";

const BASE_CODE = String.raw`
npm install --save-dev \
  {FRAMEWORK}
  @testing-library/dom \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event`;

export default function InstallDependenciesCodeBlock(): ReactElement {
  return (
    <FrameworkCodeSwap
      lang="sh"
      code={BASE_CODE}
      replacement={{
        jest: `jest \\
  @jest/globals \\
  @jest/types \\`,
        vitest: "vitest \\",
      }}
    />
  );
}
