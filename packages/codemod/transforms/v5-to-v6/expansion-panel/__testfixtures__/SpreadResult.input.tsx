import { type ReactElement } from "react";
import { usePanels } from "react-md";

export default function Example(): ReactElement {
  const [panels, ...others] = usePanels({
    count: 3,
    idPrefix: "boop",
  });

  return <></>;
}
