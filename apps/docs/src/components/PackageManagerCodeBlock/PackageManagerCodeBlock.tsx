import { type ReactElement } from "react";

import {
  type PackageManagerCodeBlockProps,
  getPackageManagerJsx,
} from "./getPackageManagerJsx.js";
import { PackageManagerCodeBlockContainer } from "./PackageManagerCodeBlockContainer.js";

export function PackageManagerCodeBlock(
  props: PackageManagerCodeBlockProps,
): ReactElement {
  return (
    <PackageManagerCodeBlockContainer managers={getPackageManagerJsx(props)} />
  );
}
