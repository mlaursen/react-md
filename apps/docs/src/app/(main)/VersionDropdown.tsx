import type { SemVer } from "@/utils/semver.js";
import { DropdownMenu, MenuItem, Typography } from "@react-md/core";
import CheckIcon from "@react-md/material-icons/CheckIcon";
import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import styles from "./VersionDropdown.module.scss";
import { VersionMenuItem } from "./VersionMenuItem.jsx";

export interface VersionDropdownProps extends SemVer {
  version: string;
  isHiddenOnPhone?: boolean;
}

export function VersionDropdown(props: VersionDropdownProps): ReactElement {
  const { version, major, minor, patch, alpha, isHiddenOnPhone } = props;
  const isAlphaPreview = alpha !== null;
  const isMajorPreview = minor === 0 && patch === 0 && isAlphaPreview;
  const previousCount = major - 1;
  return (
    <DropdownMenu
      className={cnb(isHiddenOnPhone && styles.dropdown)}
      buttonChildren={
        <Typography as="span" type="subtitle-2">
          {`v${version}`}
        </Typography>
      }
    >
      <MenuItem rightAddon={<CheckIcon />} height="normal">
        {`v${version}`}
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
