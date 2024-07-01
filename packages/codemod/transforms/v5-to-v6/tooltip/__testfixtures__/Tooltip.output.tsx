import { type ReactElement } from "react";
import { Tooltip } from "react-md";

export default function Example(): ReactElement {
  return (<>
    <Tooltip>Hello</Tooltip>
    <Tooltip>Hello</Tooltip>
    <Tooltip disablePortal>Hello</Tooltip>
    <Tooltip>
      Hello
    </Tooltip>
    <Tooltip>Hello</Tooltip>
    <Tooltip>Hello</Tooltip>
    <Tooltip>Hello</Tooltip>
    <Tooltip textOverflow={lineWrap ? "allow" : "nowrap"}>Hello</Tooltip>
    <Tooltip textOverflow="nowrap">Hello</Tooltip>
  </>);
}
