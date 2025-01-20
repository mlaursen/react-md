import { Box } from "@react-md/core/box/Box";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement, type ReactNode } from "react";

import styles from "./ColorHeadingWrapper.module.scss";

export interface ColorHeadingWrapperProps {
  heading?: ReactNode;
  children: ReactNode;
}

export function ColorHeadingWrapper(
  props: ColorHeadingWrapperProps
): ReactElement {
  const { heading, children } = props;
  if (!heading) {
    return <>{children}</>;
  }

  return (
    <>
      <Typography
        as="span"
        type="headline-6"
        fontWeight="bold"
        className={styles.heading}
      >
        {heading}
      </Typography>
      <Box justify="space-between" fullWidth disablePadding>
        {children}
      </Box>
    </>
  );
}
