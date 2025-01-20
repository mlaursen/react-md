import { cssUtils } from "@react-md/core/cssUtils";
import { type ReactElement } from "react";

import { Blockquote } from "@/components/Blockquote.jsx";

import { CopyCode } from "./CopyCode.jsx";
import styles from "./TwoToneIconWarning.module.scss";

const EXAMPLE_CODE = `@use "everything";

@mixin _dark-two-tone {
  :global(.material-icons-two-tone) {
    color: rgba(everything.$black, 0.87);
    filter: contrast(4) invert(1);
  }
}

.dark {
  @include _dark-two-tone;
}

.system {
  @media (prefers-color-scheme: dark) {
    @include _dark-two-tone;
  }
}
`;

export function TwoToneIconWarning(): ReactElement {
  return (
    <>
      <Blockquote theme="warning">
        <p>
          The two-tone icons do not support dark mode out of the box and require
          additional styling to work correctly. Here is an example for how you
          can add dark mode styles.
        </p>
        <CopyCode
          lang="scss"
          className={cssUtils({ fontStyle: "normal", className: styles.code })}
        >
          {EXAMPLE_CODE}
        </CopyCode>
      </Blockquote>
    </>
  );
}
