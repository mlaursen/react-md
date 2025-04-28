 // TODO: The `itemRenderer`, `getItemProps` have been removed from the `Tree` component and need to be manually changed. The `renderer` prop is the closest in functionality.
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
