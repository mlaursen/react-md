import { type ReactElement } from "react";
import { usePanels } from "react-md";

export default function Example(): ReactElement {
  const result = usePanels({
    count: 3,
    idPrefix: "boop",
  });

  const panels = result[0];
  const onKeyDown = result[1];

  return <></>;
}
