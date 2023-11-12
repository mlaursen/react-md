import { Avatar, Chip } from "@react-md/core";
import CancelOutlinedIcon from "@react-md/material-icons/CancelOutlinedIcon";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function ChipWithAddonsExample(): ReactElement {
  return (
    <>
      <Chip leftAddon={<FavoriteIcon />}>Chip</Chip>
      <Chip rightAddon={<FavoriteIcon />}>Chip</Chip>
      <Chip
        leftAddon={<Avatar src="https://i.pravatar.cc/40?img=3" />}
        rightAddon={<CancelOutlinedIcon />}
      >
        Chip
      </Chip>
      <Chip
        leftAddon={<FavoriteIcon />}
        rightAddon={<Avatar src="https://i.pravatar.cc/40?img=3" />}
      >
        Chip
      </Chip>
    </>
  );
}
