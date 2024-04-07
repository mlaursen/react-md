import { type ReactElement } from "react";
import {
  PackageManagerCodeBlock,
  type PackageManagerCodeBlockProps,
} from "./PackageManagerCodeBlock.jsx";
import { type PackageManager } from "@react-md/code/PackageManagerProvider";
import { highlightCode } from "@react-md/code/prismjs/highlight";

export type PackageManagerCommandProps = PackageManagerCodeBlockProps;

export function PackageManagerCommand(
  props: PackageManagerCommandProps
): ReactElement {
  const { lineWrap, managers } = props;
  const highlightedManagers: Record<PackageManager, string> = { ...managers };
  Object.entries(managers).forEach(([name, code]) => {
    highlightedManagers[name] = highlightCode({ code, lang: "sh" });
  });

  return (
    <PackageManagerCodeBlock
      lineWrap={lineWrap}
      managers={highlightedManagers}
    />
  );
}
