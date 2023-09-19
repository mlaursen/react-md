import type { SemVer } from "@/utils/semver.js";
import { Typography, appBarTitle, box } from "@react-md/core";
import type { ReactElement } from "react";
import { VersionDropdown } from "./VersionDropdown.jsx";

export interface RootLayoutTitleProps extends SemVer {
  version: string;
}

export function RootLayoutTitle(props: RootLayoutTitleProps): ReactElement {
  return (
    <div
      style={{ "--rmd-box-gap": 0 }}
      className={appBarTitle({
        className: box({ disablePadding: true }),
      })}
    >
      <Typography type="headline-6" margin="none">
        react-md
      </Typography>
      <VersionDropdown isHiddenOnPhone {...props} />
    </div>
  );
}
