import { type ReactElement } from "react";
import { VerticalDivider } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <VerticalDivider />
      <VerticalDivider maxHeight={0.8} />
      <VerticalDivider maxHeight={0.8} className="custom-class-name" />
    </>
  );
}
