import { type ReactElement } from "react";
import { Divider } from "react-md";

export default function Example(): ReactElement {
  return (<>
    <Divider vertical />
    <Divider vertical />
    <Divider className="custom-class-name" vertical />
  </>);
}
