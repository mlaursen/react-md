import type { ReactElement } from "react";

import { RMD_MAJOR_VERSION } from "constants/rmdVersion";

import VersionMenuItem from "./VersionMenuItem";

const MAX = RMD_MAJOR_VERSION - 1;

export interface PreviousDocsMenuItemsProps {
  small?: boolean;
}

export default function PreviousDocsMenuItems({
  small,
}: PreviousDocsMenuItemsProps): ReactElement {
  return (
    <>
      {typeof window !== "undefined" &&
        window.location.origin !== "https://react-md.dev" && (
          <VersionMenuItem key="latest" small={small} version="latest" />
        )}
      {Array.from({ length: MAX }, (_, i) => (
        <VersionMenuItem key={i} small={small} version={`v${MAX - i}`} />
      ))}
    </>
  );
}
