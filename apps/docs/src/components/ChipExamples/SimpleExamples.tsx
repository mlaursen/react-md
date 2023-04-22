import { Avatar, Box, Chip } from "@react-md/core";
import AddCircleIcon from "@react-md/material-icons/AddCircleIcon";
import ImageIcon from "@react-md/material-icons/ImageIcon";
import type { ReactElement } from "react";

export function SimpleExamples(): ReactElement {
  return (
    <Box>
      <Chip>Chip</Chip>
      <Chip disabled>Disabled</Chip>

      <Chip theme="outline">Outline</Chip>
      <Chip disabled theme="outline">
        Disabled Outline
      </Chip>

      <Chip raisable>Raisable</Chip>
      <Chip raisable theme="outline">
        Raisable Outline
      </Chip>

      <Chip leftAddon={<ImageIcon />}>Chip</Chip>
      <Chip theme="outline" leftAddon={<ImageIcon />}>
        Chip
      </Chip>
      <Chip disabled leftAddon={<ImageIcon />}>
        Chip
      </Chip>
      <Chip disabled theme="outline" leftAddon={<ImageIcon />}>
        Chip
      </Chip>
      <Chip disableContentWrap>
        <ImageIcon />
        This One
        <AddCircleIcon />
      </Chip>
      <Chip leftAddon={<ImageIcon />} rightAddon={<AddCircleIcon />}>
        Chip
      </Chip>
      <Chip
        theme="outline"
        leftAddon={<ImageIcon />}
        rightAddon={<AddCircleIcon />}
      >
        Chip
      </Chip>
      <Chip disabled leftAddon={<ImageIcon />} rightAddon={<AddCircleIcon />}>
        Chip
      </Chip>
      <Chip
        disabled
        theme="outline"
        leftAddon={<ImageIcon />}
        rightAddon={<AddCircleIcon />}
      >
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
      <Chip
        disabled
        leftAddon={
          <Avatar>
            <img src="https://i.pravatar.cc/40?img=3" alt="" />
          </Avatar>
        }
        rightAddon={<AddCircleIcon />}
      >
        Chip
      </Chip>
      <Chip
        disabled
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
    </Box>
  );
}
