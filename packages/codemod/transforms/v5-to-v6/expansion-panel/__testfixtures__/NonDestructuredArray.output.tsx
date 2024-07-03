import { type ReactElement } from "react";
import { useExpansionPanels } from "react-md";

export default function Example(): ReactElement {
  // TODO: The codemod only supports destructuring the result from `usePanels`
  const result = useExpansionPanels({
    baseId: "boop"
  });

  const panels = result[0];
  const onKeyDown = result[1];

  return <></>;
}
