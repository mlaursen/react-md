import React, { FC } from "react";
import { Chip } from "@react-md/chip";
import { AddCircleSVGIcon, ImageSVGIcon } from "@react-md/material-icons";

import Container from "./Container";

const SimpleChips: FC = () => {
  return (
    <Container>
      <Chip id="chip-1">Action Chip</Chip>
      <Chip id="chip-2" theme="outline">
        Action Chip
      </Chip>
      <Chip id="chip-3" leftIcon={<ImageSVGIcon />}>
        Outlined Chip
      </Chip>
      <Chip id="chip-4" theme="outline" leftIcon={<ImageSVGIcon />}>
        Outlined Chip
      </Chip>
      <Chip
        id="chip-5"
        leftIcon={<ImageSVGIcon />}
        rightIcon={
          <AddCircleSVGIcon
            style={{
              transform: "rotate(45deg)",
              WebkitTransform: "rotate(45deg)",
            }}
          />
        }
      >
        Action Chip
      </Chip>
    </Container>
  );
};

export default SimpleChips;
