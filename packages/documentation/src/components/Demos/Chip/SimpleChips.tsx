import React, { FC } from "react";
import { Avatar } from "@react-md/avatar";
import { Chip } from "@react-md/chip";
import { AddCircleSVGIcon, ImageSVGIcon } from "@react-md/material-icons";
import { LazyImage } from "@react-md/media";
import { Grid } from "@react-md/utils";

const XCircleIcon: FC = (props) => (
  <AddCircleSVGIcon
    {...props}
    style={{
      transform: "rotate(45deg)",
      WebkitTransform: "rotate(45deg)",
    }}
  />
);

const SimpleChips: FC = () => (
  <Grid phoneColumns={1} columns={2} wrapOnly>
    <Chip>Chip</Chip>
    <Chip theme="outline">Chip</Chip>
    <Chip disabled>Chip</Chip>
    <Chip disabled theme="outline">
      Chip
    </Chip>
    <Chip raisable>Chip</Chip>
    <Chip raisable theme="outline">
      Chip
    </Chip>
    <Chip leftIcon={<ImageSVGIcon />}>Chip</Chip>
    <Chip leftIcon={<ImageSVGIcon />} theme="outline">
      Chip
    </Chip>
    <Chip disabled leftIcon={<ImageSVGIcon />}>
      Chip
    </Chip>
    <Chip disabled leftIcon={<ImageSVGIcon />} theme="outline">
      Chip
    </Chip>
    <Chip leftIcon={<ImageSVGIcon />} rightIcon={<XCircleIcon />}>
      Chip
    </Chip>
    <Chip
      leftIcon={<ImageSVGIcon />}
      rightIcon={<XCircleIcon />}
      theme="outline"
    >
      Chip
    </Chip>
    <Chip disabled leftIcon={<ImageSVGIcon />} rightIcon={<XCircleIcon />}>
      Chip
    </Chip>
    <Chip
      disabled
      leftIcon={<ImageSVGIcon />}
      rightIcon={<XCircleIcon />}
      theme="outline"
    >
      Chip
    </Chip>
    <Chip
      leftIcon={
        <Avatar>
          <LazyImage src="https://i.pravatar.cc/40?img=3" />
        </Avatar>
      }
      rightIcon={<XCircleIcon />}
    >
      Chip
    </Chip>
    <Chip
      leftIcon={
        <Avatar>
          <LazyImage src="https://i.pravatar.cc/40?img=3" />
        </Avatar>
      }
      rightIcon={<XCircleIcon />}
      theme="outline"
    >
      Chip
    </Chip>
    <Chip
      disabled
      leftIcon={
        <Avatar>
          <LazyImage src="https://i.pravatar.cc/40?img=3" />
        </Avatar>
      }
      rightIcon={<XCircleIcon />}
    >
      Chip
    </Chip>
    <Chip
      disabled
      leftIcon={
        <Avatar>
          <LazyImage src="https://i.pravatar.cc/40?img=3" />
        </Avatar>
      }
      rightIcon={<XCircleIcon />}
      theme="outline"
    >
      Chip
    </Chip>
  </Grid>
);

export default SimpleChips;
