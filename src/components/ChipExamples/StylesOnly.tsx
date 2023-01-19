import { Box, chip, Chip, chipContent } from "@react-md/core";
import AddCircleIcon from "@react-md/material-icons/AddCircleIcon";
import ImageIcon from "@react-md/material-icons/ImageIcon";
import type { ReactElement } from "react";

export function StylesOnly(): ReactElement {
  return (
    <>
      <Box>
        <Chip noninteractive>Solid</Chip>
        <Chip
          leftAddon={<ImageIcon />}
          rightAddon={<AddCircleIcon />}
          noninteractive
        >
          Solid
        </Chip>
        <Chip noninteractive disabled>
          Solid Disabled
        </Chip>
        <Chip
          disabled
          leftAddon={<ImageIcon />}
          rightAddon={<AddCircleIcon />}
          noninteractive
        >
          Solid Disabled
        </Chip>
        <Chip noninteractive theme="outline">
          Outline
        </Chip>
        <Chip
          theme="outline"
          leftAddon={<ImageIcon />}
          rightAddon={<AddCircleIcon />}
          noninteractive
        >
          Outline
        </Chip>
        <Chip noninteractive theme="outline" disabled>
          Outline Disabled
        </Chip>
        <Chip
          theme="outline"
          leftAddon={<ImageIcon />}
          rightAddon={<AddCircleIcon />}
          disabled
          noninteractive
        >
          Disabled Outline
        </Chip>
        <Chip noninteractive selected>
          Selected
        </Chip>
        <Chip selected rightAddon={<AddCircleIcon />} noninteractive>
          Selected
        </Chip>
        <Chip selected selectedThemed noninteractive>
          Selected Themed
        </Chip>
        <Chip
          selected
          selectedThemed
          rightAddon={<AddCircleIcon />}
          noninteractive
        >
          Selected Themed
        </Chip>
      </Box>
      <Box>
        <div
          className={chip({
            // custom class name can be merged
            // className: "",
            noninteractive: true,
          })}
        >
          Solid
        </div>
        <div
          className={chip({
            noninteractive: true,
            leftAddon: true,
            rightAddon: true,
          })}
        >
          <ImageIcon />
          Solid
          <AddCircleIcon />
        </div>
        <div className={chip({ noninteractive: true, disabled: true })}>
          Solid Disabled
        </div>
        <div
          className={chip({
            noninteractive: true,
            disabled: true,
            leftAddon: true,
            rightAddon: true,
          })}
        >
          <ImageIcon />
          Solid Disabled
          <AddCircleIcon />
        </div>
        <div className={chip({ noninteractive: true, theme: "outline" })}>
          Outline
        </div>
        <div
          className={chip({
            noninteractive: true,
            theme: "outline",
            leftAddon: true,
            rightAddon: true,
          })}
        >
          <ImageIcon />
          Outline
          <AddCircleIcon />
        </div>
        <div
          className={chip({
            noninteractive: true,
            theme: "outline",
            disabled: true,
          })}
        >
          Outline Disabled
        </div>
        <div
          className={chip({
            noninteractive: true,
            theme: "outline",
            disabled: true,
            leftAddon: true,
            rightAddon: true,
          })}
        >
          <ImageIcon />
          Outline Disabled
          <AddCircleIcon />
        </div>
        <div
          className={chip({
            noninteractive: true,
            selected: true,
            selectedThemed: true,
          })}
        >
          Selected Themed
        </div>
        <div
          className={chip({
            noninteractive: true,
            leftAddon: true,
            rightAddon: true,
          })}
          style={{ width: "8rem" }}
        >
          <ImageIcon />
          <span className={chipContent()}>Truncated text</span>
          <AddCircleIcon />
        </div>
      </Box>
    </>
  );
}
