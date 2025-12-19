import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.js";

const BASE_CODE = `
import { matchPhone, render } from "@react-md/core/test-utils";
import { spyOnMatchMedia } from "@react-md/core/test-utils/{FRAMEWORK}";

const matchMedia = spyOnMatchMedia(matchPhone);
render(<Test />);

// expect phone results
`;

export default function DefaultMediaExample(): ReactElement {
  return (
    <FrameworkCodeSwap lang="tsx" code={BASE_CODE} fileName="Default Media" />
  );
}
