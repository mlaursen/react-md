import { type ReactElement } from "react";
import { Tree } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <Tree itemRenderer={itemRenderer} />
      <Tree getItemProps={getItemProps} />
    </>
  );
}
