import { type ReactElement } from "react";
import { Typography } from "react-md";
import CustomComponent from "./CustomComponent";

export default function Example(): ReactElement {
  return (
    <Typography>
      {({ className }) => (
        <CustomComponent classNameProp={className}>
          Hello, world!
        </CustomComponent>
      )}
    </Typography>
  );
}
