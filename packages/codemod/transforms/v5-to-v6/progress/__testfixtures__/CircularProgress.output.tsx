import { type ReactElement } from "react";
import { CircularProgress } from "react-md";

export default function Example(): ReactElement {
  return (<>
    <CircularProgress id="some-id-1" dense />
    <CircularProgress id="some-id-2" />
    <CircularProgress id="some-id-3" />
    <CircularProgress id="some-id-4" disableCentered />
    <CircularProgress id="some-id-5" />
  </>);
}
