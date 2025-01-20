import { type ReactElement } from "react";

import { PackageManagerCodeBlockContainer } from "./PackageManagerCodeBlockContainer.jsx";
import {
  type PackageManagerCodeBlockProps,
  getPackageManagerJsx,
} from "./getPackageManagerJsx.jsx";

export function PackageManagerCodeBlock(
  props: PackageManagerCodeBlockProps
): ReactElement {
  return (
    <PackageManagerCodeBlockContainer managers={getPackageManagerJsx(props)} />
  );
}
