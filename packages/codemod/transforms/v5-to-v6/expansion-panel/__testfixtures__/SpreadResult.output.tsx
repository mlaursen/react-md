import { type ReactElement } from "react";
import { useExpansionPanels } from "react-md";

export default function Example(): ReactElement {
  // TODO: The codemod does not support the array spread pattern for the result from `usePanels`
  const [panels, ...others] = useExpansionPanels({
    baseId: "boop"
  });

  return <></>;
}
