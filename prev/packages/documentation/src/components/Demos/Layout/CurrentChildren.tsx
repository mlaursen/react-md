import type { ReactElement } from "react";
import { Typography } from "@react-md/typography";
import { Grid } from "@react-md/utils";

import Code from "components/Code";

export interface CurrentChildrenProps {
  route: string;
}

export function CurrentChildren({
  route,
}: CurrentChildrenProps): ReactElement | null {
  return (
    <Grid columns={1}>
      <Typography type="headline-3" margin="none">
        Contents
      </Typography>
      <Typography margin="none">
        The current route is: <Code>{route}</Code>
      </Typography>
    </Grid>
  );
}
