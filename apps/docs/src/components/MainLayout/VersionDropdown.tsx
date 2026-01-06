import { ListItemLink } from "@react-md/core/list/ListItemLink";
import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuItem } from "@react-md/core/menu/MenuItem";
import { Typography } from "@react-md/core/typography/Typography";
import CheckIcon from "@react-md/material-icons/CheckIcon";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";

import { DISPLAY_NONE_PHONE } from "@/constants/classnames.js";
import { IS_PRODUCTION_ENV, RMD_VERSION } from "@/constants/env.js";
import { IS_MAJOR_PREVIEW, MAJOR_VERSION } from "@/constants/version.js";

import { VersionMenuItem } from "./VersionMenuItem.jsx";

export interface VersionDropdownProps {
  isHiddenOnPhone?: boolean;
}

export function VersionDropdown(props: VersionDropdownProps): ReactElement {
  const { isHiddenOnPhone } = props;

  const previousCount = MAJOR_VERSION - 1;

  return (
    <DropdownMenu
      className={cnb(isHiddenOnPhone && DISPLAY_NONE_PHONE)}
      buttonChildren={
        <Typography as="span" type="subtitle-2">{`v${RMD_VERSION}`}</Typography>
      }
    >
      {!IS_PRODUCTION_ENV && (
        <ListItemLink role="menuitem" href="https://react-md.dev">
          latest
        </ListItemLink>
      )}
      <MenuItem rightAddon={<CheckIcon />} height="normal">
        {`v${RMD_VERSION}`}
      </MenuItem>
      {Array.from({ length: previousCount }, (_, i) => (
        <VersionMenuItem
          key={i}
          version={`v${previousCount - i}`}
          latest={i === 0 && IS_MAJOR_PREVIEW}
        />
      ))}
    </DropdownMenu>
  );
}
