// TODO: Check the `Typography` usage to see if using the removed children function renderer behavior for getting the class name.
import { type ReactElement } from "react";
import { Typography } from "react-md";
import CustomComponent from "./CustomComponent";

export default function Example(): ReactElement {
  return (
    <Typography
      children={({ className }) => (
        <CustomComponent classNameProp={className}>
          Hello, world!
        </CustomComponent>
      )}
    />
  );
}
