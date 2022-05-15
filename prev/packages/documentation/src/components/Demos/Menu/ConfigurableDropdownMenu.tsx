import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { upperFirst } from "lodash";
import type {
  ButtonTheme,
  ButtonThemeType,
  ButtonType,
} from "@react-md/button";
import { Divider } from "@react-md/divider";
import { Checkbox, Form, Select, useSelectState } from "@react-md/form";
import {
  InfoOutlineSVGIcon,
  MoreVertSVGIcon,
  StarSVGIcon,
} from "@react-md/material-icons";
import type { MenuItemProps } from "@react-md/menu";
import { DropdownMenu, MenuItem, MenuItemSeparator } from "@react-md/menu";
import { Typography } from "@react-md/typography";
import {
  ABOVE_CENTER_ANCHOR,
  ABOVE_INNER_LEFT_ANCHOR,
  ABOVE_INNER_RIGHT_ANCHOR,
  ABOVE_LEFT_ANCHOR,
  ABOVE_RIGHT_ANCHOR,
  BELOW_CENTER_ANCHOR,
  BELOW_INNER_LEFT_ANCHOR,
  BELOW_INNER_RIGHT_ANCHOR,
  BELOW_LEFT_ANCHOR,
  BELOW_RIGHT_ANCHOR,
  BOTTOM_CENTER_ANCHOR,
  BOTTOM_INNER_LEFT_ANCHOR,
  BOTTOM_INNER_RIGHT_ANCHOR,
  BOTTOM_LEFT_ANCHOR,
  BOTTOM_RIGHT_ANCHOR,
  CENTER_CENTER_ANCHOR,
  CENTER_INNER_LEFT_ANCHOR,
  CENTER_INNER_RIGHT_ANCHOR,
  CENTER_LEFT_ANCHOR,
  CENTER_RIGHT_ANCHOR,
  Grid,
  TOP_CENTER_ANCHOR,
  TOP_INNER_LEFT_ANCHOR,
  TOP_INNER_RIGHT_ANCHOR,
  TOP_LEFT_ANCHOR,
  TOP_RIGHT_ANCHOR,
} from "@react-md/utils";

import styles from "./ConfigurableDropdownMenu.module.scss";

const buttonThemes: ButtonTheme[] = [
  "clear",
  "primary",
  "secondary",
  "warning",
  "error",
  "disabled",
];
const buttonThemeTypes: ButtonThemeType[] = ["flat", "outline", "contained"];
const buttonTypes: ButtonType[] = ["text", "icon"];
const dropdownIcons = ["undefined", "true", "false"] as const;
const anchors = [
  ABOVE_LEFT_ANCHOR,
  ABOVE_INNER_LEFT_ANCHOR,
  ABOVE_CENTER_ANCHOR,
  ABOVE_INNER_RIGHT_ANCHOR,
  ABOVE_RIGHT_ANCHOR,
  TOP_LEFT_ANCHOR,
  TOP_INNER_LEFT_ANCHOR,
  TOP_CENTER_ANCHOR,
  TOP_INNER_RIGHT_ANCHOR,
  TOP_RIGHT_ANCHOR,
  CENTER_LEFT_ANCHOR,
  CENTER_INNER_LEFT_ANCHOR,
  CENTER_CENTER_ANCHOR,
  CENTER_INNER_RIGHT_ANCHOR,
  CENTER_RIGHT_ANCHOR,
  BOTTOM_LEFT_ANCHOR,
  BOTTOM_INNER_LEFT_ANCHOR,
  BOTTOM_CENTER_ANCHOR,
  BOTTOM_INNER_RIGHT_ANCHOR,
  BOTTOM_RIGHT_ANCHOR,
  BELOW_LEFT_ANCHOR,
  BELOW_INNER_LEFT_ANCHOR,
  BELOW_CENTER_ANCHOR,
  BELOW_INNER_RIGHT_ANCHOR,
  BELOW_RIGHT_ANCHOR,
] as const;
const anchorOptions = anchors.map((anchor, i) => ({
  label: `${upperFirst(anchor.y)} ${upperFirst(anchor.x)} anchor`,
  value: `${i}`,
}));

export default function ConfigurableDropdownMenu(): ReactElement {
  const [buttonTheme, handleButtonThemeChange] =
    useSelectState<ButtonTheme>("clear");
  const [buttonThemeType, handleButtonThemeTypeChange] =
    useSelectState<ButtonThemeType>("flat");
  const [buttonType, handleButtonTypeChange] =
    useSelectState<ButtonType>("text");
  const [dropdownIcon, handleDropdownIconChange] =
    useSelectState<typeof dropdownIcons[number]>("undefined");
  const [horizontal, setHorizontal] = useState(false);
  const [leftAddon, setLeftAddon] = useState(true);
  const [rightAddon, setRightAddon] = useState(true);
  const [anchorIndex, setAnchorIndex] = useState(() =>
    anchors.findIndex((a) => a === TOP_INNER_RIGHT_ANCHOR)
  );
  const [equalWidth, setEqualWidth] = useState(false);

  const anchor = anchors[anchorIndex];
  useEffect(() => {
    if (anchor.x !== "center" && equalWidth) {
      setEqualWidth(false);
    }
  }, [anchor.x, equalWidth]);
  useEffect(() => {
    const defaultAnchor = horizontal
      ? CENTER_CENTER_ANCHOR
      : TOP_INNER_RIGHT_ANCHOR;

    setAnchorIndex(anchors.findIndex((a) => a === defaultAnchor));
  }, [horizontal]);

  let disableDropdownIcon: boolean | undefined;
  if (dropdownIcon === "true") {
    disableDropdownIcon = true;
  } else if (dropdownIcon === "false") {
    disableDropdownIcon = false;
  }

  const itemProps: MenuItemProps = {
    onClick(event) {
      // eslint-disable-next-line no-console
      console.log(`Clicked ${event.currentTarget.innerText}`);
    },
    leftAddon: leftAddon && <StarSVGIcon />,
    rightAddon: rightAddon && <InfoOutlineSVGIcon />,
  };

  return (
    <>
      <Form>
        <Grid
          columns={1}
          desktopColumns={2}
          largeDesktopColumns={3}
          padding={0}
        >
          <Grid columns={1} className={styles.column}>
            <Typography type="headline-6" margin="none">
              Button Props
            </Typography>
            <Select
              id="dropdown-menu-button-theme"
              label="Theme"
              name="theme"
              options={buttonThemes}
              value={buttonTheme}
              onChange={handleButtonThemeChange}
            />
            <Select
              id="dropdown-menu-button-theme-type"
              label="Theme Type"
              name="themeType"
              options={buttonThemeTypes}
              value={buttonThemeType}
              onChange={handleButtonThemeTypeChange}
            />
            <Select
              id="dropdown-menu-button-button-type"
              label="Button Type"
              name="buttonType"
              options={buttonTypes}
              value={buttonType}
              onChange={handleButtonTypeChange}
            />
            <Select
              id="dropdown-menu-button-disable-dropdown-icon"
              label="Disable Dropdown Icon"
              name="disableDropdownIcon"
              options={dropdownIcons}
              value={dropdownIcon}
              onChange={handleDropdownIconChange}
            />
          </Grid>
          <Grid columns={1} className={styles.column} clone>
            <Typography type="headline-6" margin="none">
              Menu Props
            </Typography>
            <Select
              id="dropdown-menu-anchor"
              label="Menu Anchor"
              options={anchorOptions}
              value={`${anchorIndex}`}
              onChange={(value) => {
                const i = parseInt(value, 10);
                if (!Number.isNaN(i) && i >= 0 && i <= anchorOptions.length) {
                  setAnchorIndex(i);
                }
              }}
            />
            <Checkbox
              id="dropdown-menu-horizontal"
              name="horizontal"
              checked={horizontal}
              onChange={(event) => setHorizontal(event.currentTarget.checked)}
              label="Horizontal"
            />
            <Checkbox
              id="dropdown-menu-equal-width"
              name="equalWidth"
              checked={equalWidth}
              onChange={(event) => setEqualWidth(event.currentTarget.checked)}
              label="Equal Width"
              disabled={anchor.x !== "center"}
            />
          </Grid>
          <Grid columns={1} className={styles.column} clone>
            <Typography type="headline-6" margin="none">
              MenuItem Props
            </Typography>
            <Checkbox
              id="dropdown-menu-left-addon"
              name="leftAddon"
              checked={leftAddon}
              onChange={(event) => setLeftAddon(event.currentTarget.checked)}
              label="leftAddon"
            />
            <Checkbox
              id="dropdown-menu-right-addon"
              name="rightAddon"
              checked={rightAddon}
              onChange={(event) => setRightAddon(event.currentTarget.checked)}
              label="rightAddon"
            />
          </Grid>
        </Grid>
      </Form>
      <Divider />
      <div className={styles.container}>
        <DropdownMenu
          id="configurable-dropdown-menu"
          horizontal={horizontal}
          theme={buttonTheme}
          themeType={buttonThemeType}
          buttonType={buttonType}
          buttonChildren={
            buttonType === "icon" ? <MoreVertSVGIcon /> : "Dropdown"
          }
          disableDropdownIcon={disableDropdownIcon}
          anchor={anchor}
          fixedPositionOptions={{
            width: equalWidth ? "equal" : "auto",
            // any other fixed position options can be added here as well
            // xMargin: 20,
            // yMargin: 20,
          }}
        >
          <MenuItem {...itemProps}>Item 1</MenuItem>
          <MenuItem {...itemProps} disabled>
            Item 2
          </MenuItem>
          <MenuItemSeparator />
          <MenuItem {...itemProps}>Item 3</MenuItem>
          <MenuItem {...itemProps}>Item 4</MenuItem>
          {/* maxHeight will only be applied while rendered in horizontal menus */}
          {/* inset will only be applied when rendered in vertical menus */}
          <MenuItemSeparator maxHeight={0.6} inset />
          <MenuItem {...itemProps} disabled>
            Item 5
          </MenuItem>
        </DropdownMenu>
      </div>
    </>
  );
}
