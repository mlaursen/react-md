import { ReactElement } from "react";
import { Text } from "@react-md/typography";
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
      <Text type="headline-3" margin="none">
        Contents
      </Text>
      <Text margin="none">
        The current route is: <Code>{route}</Code>
      </Text>
    </Grid>
  );
}
