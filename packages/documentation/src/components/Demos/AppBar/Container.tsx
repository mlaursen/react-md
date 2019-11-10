import React, { FC, HTMLAttributes } from "react";
import { Grid } from "@react-md/utils";

const Container: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <Grid {...props} clone padding={0} columns={1}>
    {children}
  </Grid>
);

export default Container;
