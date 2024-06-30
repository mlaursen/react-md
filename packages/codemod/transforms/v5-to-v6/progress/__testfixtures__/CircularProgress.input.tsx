import { type ReactElement } from "react";
import { CircularProgress } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <CircularProgress id="some-id-1" small />
      <CircularProgress id="some-id-2" small={false} />
      <CircularProgress id="some-id-3" centered />
      <CircularProgress id="some-id-4" centered={false} />
      <CircularProgress id="some-id-5" maxRotation={360 * 1.5} />
    </>
  );
}
