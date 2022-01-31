// This example is mostly a port to react-md from:
// https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-editor.html
import { ReactElement, useState } from "react";
import { AppBar } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
import {
  Form,
  MenuItemCheckbox,
  MenuItemRadio,
  TextFieldWithMessage,
  useNumberField,
} from "@react-md/form";
import {
  AddSVGIcon,
  BuildSVGIcon,
  RemoveSVGIcon,
} from "@react-md/material-icons";
import {
  DropdownMenu,
  MenuBar,
  MenuItem,
  MenuItemGroup,
  MenuItemSeparator,
} from "@react-md/menu";
import scssVariables from "@react-md/theme/dist/scssVariables";
import { Typography } from "@react-md/typography";
import type { CalculateFixedPositionOptions } from "@react-md/utils";

import Code from "components/Code";

import styles from "./HoverableMenus.module.scss";
import InfiniteDropdownMenu from "./InfiniteDropdownMenu";

const FONT_FAMILIES = [
  "Roboto",
  "Sans-serif",
  "Serif",
  "Monospace",
  "Fantasy",
] as const;
type FontFamily = typeof FONT_FAMILIES[number];

const COLORS = [
  { label: "Current Color", value: "" },
  { label: "Blue", value: scssVariables["rmd-blue-500"] },
  { label: "Red", value: scssVariables["rmd-red-500"] },
  { label: "Green", value: scssVariables["rmd-green-500"] },
] as const;
type Color = typeof COLORS[number]["value"];

const TEXT_DECORATIONS = [
  { label: "None", value: "none" },
  { label: "Overline", value: "overline" },
  { label: "Line-through", value: "line-through" },
  { label: "Underline", value: "underline" },
] as const;
type TextDecoration = typeof TEXT_DECORATIONS[number]["value"];

const TEXT_ALIGNS = [
  { label: "Left", value: "left" },
  { label: "Right", value: "right" },
  { label: "Center", value: "center" },
  { label: "Justify", value: "justify" },
] as const;
type TextAlign = typeof TEXT_ALIGNS[number]["value"];

const FONT_SIZES = [
  { label: "X-Small", value: "x-small" },
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
  { label: "X-Large", value: "x-large" },
] as const;
type FontSize = typeof FONT_SIZES[number]["value"];

const fixedPositionOptions: CalculateFixedPositionOptions = {
  preventOverlap: true,
  disableSwapping: true,
};

const EXAMPLE_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dictum sodales sem, non molestie nunc mollis at. Morbi sed lobortis lorem. Vivamus nisi turpis, blandit eu dolor a, tincidunt eleifend odio. Integer id dui velit. Nulla nisi eros, porttitor id ligula id, hendrerit maximus mauris. Sed feugiat lacinia euismod. Mauris eros lectus, ultrices et arcu in, finibus ornare neque. Proin rhoncus molestie sagittis. Cras sit amet magna sed erat scelerisque auctor. Mauris iaculis erat non mi mollis, eget feugiat odio lacinia. Aliquam dapibus at velit quis posuere. Phasellus est sem, auctor in mattis ut, rhoncus eu metus. In turpis sem, fermentum a elementum eu, lobortis ut massa. Suspendisse a urna enim.";

export default function HoverableMenus(): ReactElement {
  const [fontFamily, setFontFamily] = useState<FontFamily>(FONT_FAMILIES[0]);
  const [color, setColor] = useState<Color>(COLORS[0].value);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [textDecoration, setTextDecoration] = useState<TextDecoration>(
    TEXT_DECORATIONS[0].value
  );
  const [textAlign, setTextAlign] = useState<TextAlign>(TEXT_ALIGNS[0].value);
  const [fontSize, setFontSize] = useState<FontSize>("medium");

  const updateFontSize = (increment: boolean): void => {
    setFontSize((fontSize) => {
      const i = FONT_SIZES.findIndex(({ value }) => value === fontSize);
      const amount = increment ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(FONT_SIZES.length, i + amount));

      return FONT_SIZES[nextIndex].value;
    });
  };
  const [visible, setVisible] = useState(false);
  const onRequestClose = (): void => setVisible(false);
  const [hoverTimeout, textFieldProps, { reset }] = useNumberField({
    id: "hoverable-menus-hover-timeout",
    min: 0,
    max: 3000,
    step: 100,
    fixOnBlur: false,
  });

  return (
    <div className={styles.container}>
      <AppBar component="div" theme="default" className={styles.appbar}>
        <MenuBar
          aria-label="Text Formatting"
          // The default behavior is to require the user to click one of the
          // `DropdownMenu` below before enabling the "hover mode" behavior.
          // This can be overridden by setting the `hoverTimeout` prop which
          // will update the behavior so the "hover mode" behavior will be
          // active after the user has hovered over one of the `DropdownMenu`s
          // for that amount of time in milliseconds
          hoverTimeout={hoverTimeout}
        >
          <DropdownMenu
            id="menubar-item-1"
            buttonChildren="Font"
            fixedPositionOptions={fixedPositionOptions}
          >
            {FONT_FAMILIES.map((font, i) => (
              <MenuItemRadio
                id={`menubar-item-font-${i + 1}`}
                key={font}
                checked={font === fontFamily}
                onCheckedChange={() => setFontFamily(font)}
              >
                {font}
              </MenuItemRadio>
            ))}
          </DropdownMenu>
          <DropdownMenu
            id="menubar-item-2"
            buttonChildren="Style/Color"
            fixedPositionOptions={fixedPositionOptions}
          >
            <MenuItemCheckbox
              id="menubar-item-bold"
              checked={bold}
              onCheckedChange={(checked) => setBold(checked)}
            >
              Bold
            </MenuItemCheckbox>
            <MenuItemCheckbox
              id="menubar-item-italic"
              checked={italic}
              onCheckedChange={(checked) => setItalic(checked)}
            >
              Italic
            </MenuItemCheckbox>
            <MenuItemGroup aria-label="Color">
              {COLORS.map(({ label, value }, i) => (
                <MenuItemRadio
                  id={`menubar-item-color-${i + 1}`}
                  key={value}
                  checked={color === value}
                  onCheckedChange={() => setColor(value)}
                >
                  {label}
                </MenuItemRadio>
              ))}
            </MenuItemGroup>
            <MenuItemSeparator />
            <MenuItemGroup aria-label="Text Decoration">
              {TEXT_DECORATIONS.map(({ label, value }, i) => (
                <MenuItemRadio
                  id={`menubar-item-decoration-${i + 1}`}
                  key={value}
                  checked={textDecoration === value}
                  onCheckedChange={() => setTextDecoration(value)}
                >
                  {label}
                </MenuItemRadio>
              ))}
            </MenuItemGroup>
          </DropdownMenu>
          <DropdownMenu
            id="menubar-item-3"
            buttonChildren="Text Align"
            fixedPositionOptions={fixedPositionOptions}
          >
            <MenuItemGroup aria-label="Text Align">
              {TEXT_ALIGNS.map(({ label, value }, i) => (
                <MenuItemRadio
                  id={`menubar-item-3-align-${i + 1}`}
                  key={value}
                  checked={value === textAlign}
                  onCheckedChange={() => setTextAlign(value)}
                >
                  {label}
                </MenuItemRadio>
              ))}
            </MenuItemGroup>
            <MenuItemSeparator />
            <InfiniteDropdownMenu
              index={3}
              depth={1}
              buttonChildren="Infinite Menu"
            />
          </DropdownMenu>
          <DropdownMenu
            id="menubar-item-4"
            buttonChildren="Size"
            fixedPositionOptions={fixedPositionOptions}
          >
            <MenuItem
              id="menubar-item-4-smaller"
              onClick={() => updateFontSize(false)}
              leftAddon={<RemoveSVGIcon />}
              disabled={fontSize === "x-small"}
              disabledOpacity
            >
              Smaller
            </MenuItem>
            <MenuItem
              id="menubar-item-4-bigger"
              onClick={() => updateFontSize(true)}
              leftAddon={<AddSVGIcon />}
              disabled={fontSize === "x-large"}
              disabledOpacity
            >
              Bigger
            </MenuItem>
            <MenuItemSeparator />
            <MenuItemGroup aria-label="Font Size">
              {FONT_SIZES.map(({ label, value }, i) => (
                <MenuItemRadio
                  id={`menubar-item-4-font-size-${i + 1}`}
                  key={value}
                  checked={value === fontSize}
                  onCheckedChange={() => setFontSize(value)}
                >
                  {label}
                </MenuItemRadio>
              ))}
            </MenuItemGroup>
          </DropdownMenu>
        </MenuBar>
      </AppBar>
      <div className={styles.text}>
        <Typography
          style={{
            color: color === "" ? undefined : color,
            fontFamily,
            fontSize,
            fontStyle: italic ? "italic" : undefined,
            fontWeight: bold ? "bold" : undefined,
            textAlign,
            textDecoration,
          }}
        >
          {EXAMPLE_TEXT}
        </Typography>
      </div>
      <Button
        theme="warning"
        floating="bottom-left"
        aria-label="Configure"
        onClick={() => setVisible((prevVisible) => !prevVisible)}
      >
        <BuildSVGIcon />
      </Button>
      <Dialog
        id="configure-dialog"
        aria-labelledby="configure-dialog-title"
        modal
        visible={visible}
        onRequestClose={onRequestClose}
        className={styles.dialog}
      >
        <DialogHeader>
          <DialogTitle id="configure-dialog-title">
            Configure Hover Timeout
          </DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Form
            id="configure-form"
            onSubmit={onRequestClose}
            onReset={() => {
              reset();
              onRequestClose();
            }}
          >
            <TextFieldWithMessage
              {...textFieldProps}
              label="Hover Timeout"
              placeholder="0"
            />
          </Form>
          <Typography>
            The amount of time the user must over over a menu in milliseconds
            before the hover mode behavior is enabled.
          </Typography>
          <Typography>
            If this is <Code>undefined</Code>, the user must click one of the
            dropdown buttons before the hover mode is enabled.
          </Typography>
          <Typography>
            If this is set to <Code>0</Code>, the menus will become visible
            immediately on hover.
          </Typography>
        </DialogContent>
        <DialogFooter>
          <Button form="configure-form" type="reset" theme="warning">
            Reset
          </Button>
          <Button
            form="configure-form"
            type="submit"
            theme="primary"
            disabled={textFieldProps.error}
          >
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
