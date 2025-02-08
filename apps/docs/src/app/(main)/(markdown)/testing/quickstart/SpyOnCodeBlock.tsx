import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.jsx";

const BASE_CODE = `
const modeMock = {FRAMEWORK}
  .spyOn(INTERACTION_CONFIG, "mode", "get")
  .mockReturnValue("press");

const transitionMock = {FRAMEWORK}
  .spyOn(TRANSITION_CONFIG, "disabled", "get")
  .mockReturnValue(false);
`;

export default function SpyOnCodeBlock(): ReactElement {
  return (
    <FrameworkCodeSwap
      fileName="src/__tests__/SomeComponent.tsx"
      lang="tsx"
      code={BASE_CODE}
      replacement={{
        jest: "jest",
        vitest: "vi",
      }}
    />
  );
}
