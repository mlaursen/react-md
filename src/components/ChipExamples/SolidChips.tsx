import { Avatar, Box, Chip } from "@react-md/core";
import AddCircleIcon from "@react-md/material-icons/AddCircleIcon";
import ImageIcon from "@react-md/material-icons/ImageIcon";
import type { ReactElement } from "react";

export function SolidChips(): ReactElement {
  return (
    <Box>
      <Chip>Chip</Chip>
      <Chip raisable>Raisable</Chip>
      <Chip leftAddon={<ImageIcon />}>Chip</Chip>
      <Chip leftAddon={<ImageIcon />} rightAddon={<AddCircleIcon />}>
        Chip
      </Chip>
      <Chip
        leftAddon={
          <Avatar>
            <img src="https://i.pravatar.cc/40?img=3" alt="" />
          </Avatar>
        }
        rightAddon={<AddCircleIcon />}
      >
        Chip
      </Chip>
      <Chip style={{ width: "6rem" }}>Truncated Text</Chip>
      <Chip style={{ width: "6rem" }} raisable>
        Raisable Truncated Text
      </Chip>
      <Chip
        style={{ width: "6rem" }}
        leftAddon={<ImageIcon />}
        rightAddon={<AddCircleIcon />}
      >
        Truncated Text
      </Chip>
      <Chip disabled>Disabled</Chip>
      <Chip disabled leftAddon={<ImageIcon />}>
        Disabled
      </Chip>
      <Chip disabled leftAddon={<ImageIcon />} rightAddon={<AddCircleIcon />}>
        Disabled
      </Chip>
      <Chip
        disabled
        leftAddon={
          <Avatar>
            <img src="https://i.pravatar.cc/40?img=3" alt="" />
          </Avatar>
        }
        rightAddon={<AddCircleIcon />}
      >
        Disabled
      </Chip>
    </Box>
  );
}
