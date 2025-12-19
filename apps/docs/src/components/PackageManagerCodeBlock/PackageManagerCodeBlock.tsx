import { type ReactElement } from "react";

import { PackageManagerCodeBlockContainer } from "./PackageManagerCodeBlockContainer.js";
import {
  type PackageManagerCodeBlockProps,
  getPackageManagerJsx,
} from "./getPackageManagerJsx.js";

export function PackageManagerCodeBlock(
  props: PackageManagerCodeBlockProps
): ReactElement {
  return (
    <PackageManagerCodeBlockContainer managers={getPackageManagerJsx(props)} />
  );
}
