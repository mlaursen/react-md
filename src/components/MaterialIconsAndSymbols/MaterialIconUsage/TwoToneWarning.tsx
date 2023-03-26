import { Typography } from "@react-md/core";
import WarningIcon from "@react-md/material-icons/WarningIcon";
import type { ReactElement } from "react";
import { FormattedCodeBlock } from "src/components/Code/FormattedCodeBlock";

import styles from "./TwoToneWarning.module.scss";

const EXAMPLE_CODE = `
@use "everything";

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

export function TwoToneWarning(): ReactElement {
  return (
    <>
      <Typography>
        <WarningIcon className={styles.warning} color="warning" />
        The two-tone icons do not support dark mode out of the box and require
        additional styling to work correctly. Here is an example for how you can
        add dark mode styles.
      </Typography>
      <FormattedCodeBlock language="scss" lineWrap>
        {EXAMPLE_CODE}
      </FormattedCodeBlock>
    </>
  );
}
