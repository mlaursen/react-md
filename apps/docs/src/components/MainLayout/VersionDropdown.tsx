import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuItem } from "@react-md/core/menu/MenuItem";
import { Typography } from "@react-md/core/typography/Typography";
import CheckIcon from "@react-md/material-icons/CheckIcon";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";

import { DISPLAY_NONE_PHONE } from "@/constants/classnames.js";
import { RMD_VERSION } from "@/constants/env.js";
import { semver } from "@/utils/semver.js";

import { VersionMenuItem } from "./VersionMenuItem.jsx";

// I might just want to start react-md at v6
const MAJOR_VERSIONS_BEFORE = 5;

export interface VersionDropdownProps {
  isHiddenOnPhone?: boolean;
}

export function VersionDropdown(props: VersionDropdownProps): ReactElement {
  const { isHiddenOnPhone } = props;

  const { major, minor, patch, alpha } = semver(RMD_VERSION);
  const isAlphaPreview = alpha !== null;
  const isMajorPreview = minor === 0 && patch === 0 && isAlphaPreview;
  const previousCount = MAJOR_VERSIONS_BEFORE + major - 1;

  return (
    <DropdownMenu
      className={cnb(isHiddenOnPhone && DISPLAY_NONE_PHONE)}
      buttonChildren={
        <Typography as="span" type="subtitle-2">{`v${RMD_VERSION}`}</Typography>
      }
    >
      <MenuItem rightAddon={<CheckIcon />} height="normal">
        {`v${RMD_VERSION}`}
      </MenuItem>
      {Array.from({ length: previousCount }, (_, i) => (
        <VersionMenuItem
          key={i}
          version={`v${previousCount - i}`}
          latest={i === 0 && isMajorPreview}
        />
      ))}
    </DropdownMenu>
  );
}
