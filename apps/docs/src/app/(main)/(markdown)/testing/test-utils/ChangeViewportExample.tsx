import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.jsx";

const BASE_CODE = `
import { matchPhone, render } from "@react-md/core/test-utils";
import { spyOnMatchMedia } from "@react-md/core/test-utils/{FRAMEWORK}";

const matchMedia = spyOnMatchMedia();
render(<Test />);

// expect desktop results

matchMedia.changeViewport(matchPhone);
// expect phone results
`;

export default function ChangeViewportExample(): ReactElement {
  return (
    <FrameworkCodeSwap
      lang="tsx"
      code={BASE_CODE}
      fileName="Change Viewports"
    />
  );
}
