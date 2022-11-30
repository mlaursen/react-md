import { Avatar } from "@react-md/avatar";
import { Chip } from "@react-md/chip";
import { Box } from "@react-md/core";
import AddCircleIcon from "@react-md/material-icons/AddCircleIcon";
import ImageIcon from "@react-md/material-icons/ImageIcon";
import type { ReactElement } from "react";

export function OutlinedChips(): ReactElement {
  return (
    <Box>
      <Chip theme="outline">Chip</Chip>
      <Chip theme="outline" raisable>
        Raisable
      </Chip>
      <Chip theme="outline" leftAddon={<ImageIcon />}>
        Chip
      </Chip>
      <Chip
        theme="outline"
        leftAddon={<ImageIcon />}
        rightAddon={<AddCircleIcon />}
      >
        Chip
      </Chip>
      <Chip
        theme="outline"
        leftAddon={
          <Avatar>
            <img src="https://i.pravatar.cc/40?img=3" alt="" />
          </Avatar>
        }
        rightAddon={<AddCircleIcon />}
      >
        Chip
      </Chip>
      <Chip style={{ width: "6rem" }} theme="outline">
        Truncated Text
      </Chip>
      <Chip style={{ width: "6rem" }} theme="outline" raisable>
        Raisable Truncated Text
      </Chip>
      <Chip
        style={{ width: "6rem" }}
        theme="outline"
        leftAddon={<ImageIcon />}
        rightAddon={<AddCircleIcon />}
      >
        Truncated Text
      </Chip>
      <Chip theme="outline" disabled>
        Disabled
      </Chip>
      <Chip theme="outline" disabled leftAddon={<ImageIcon />}>
        Disabled
      </Chip>
      <Chip
        theme="outline"
        disabled
        leftAddon={<ImageIcon />}
        rightAddon={<AddCircleIcon />}
      >
        Disabled
      </Chip>
      <Chip
        theme="outline"
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
