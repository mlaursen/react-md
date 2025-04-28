import { type ReactElement } from "react";
import { SrOnly } from "react-md";
import CustomComponent from "./CustomComponent";

export default function Example(): ReactElement {
  return (
    <SrOnly>
      {({ className }) => (
        <CustomComponent classNameProp={className}>
          Hello, world!
        </CustomComponent>
      )}
    </SrOnly>
  );
}
