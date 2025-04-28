import { type ReactElement } from "react";
import { Tooltip } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <Tooltip>Hello</Tooltip>
      <Tooltip portal>Hello</Tooltip>
      <Tooltip portal={false}>Hello</Tooltip>
      <Tooltip portalInto={() => document.getElementById("some-node")}>
        Hello
      </Tooltip>
      <Tooltip portalIntoId="some-dom-id">Hello</Tooltip>
      <Tooltip lineWrap>Hello</Tooltip>
      <Tooltip lineWrap={true}>Hello</Tooltip>
      <Tooltip lineWrap={lineWrap}>Hello</Tooltip>
      <Tooltip lineWrap={false}>Hello</Tooltip>
    </>
  );
}
