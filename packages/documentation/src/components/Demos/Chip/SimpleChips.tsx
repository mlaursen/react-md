import type { ReactElement } from "react";
import { Avatar } from "@react-md/avatar";
import { Chip } from "@react-md/chip";
import type { SVGIconProps } from "@react-md/icon";
import { AddCircleSVGIcon, ImageSVGIcon } from "@react-md/material-icons";
import { Grid } from "@react-md/utils";

function XCircleIcon(props: SVGIconProps): ReactElement {
  return (
    <AddCircleSVGIcon
      {...props}
      style={{
        transform: "rotate(45deg)",
        WebkitTransform: "rotate(45deg)",
      }}
    />
  );
}

export default function SimpleChips(): ReactElement {
  return (
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
            <img src="https://i.pravatar.cc/40?img=3" alt="" />
          </Avatar>
        }
        rightIcon={<XCircleIcon />}
      >
        Chip
      </Chip>
      <Chip
        leftIcon={
          <Avatar>
            <img src="https://i.pravatar.cc/40?img=3" alt="" />
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
            <img src="https://i.pravatar.cc/40?img=3" alt="" />
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
            <img src="https://i.pravatar.cc/40?img=3" alt="" />
          </Avatar>
        }
        rightIcon={<XCircleIcon />}
        theme="outline"
      >
        Chip
      </Chip>
    </Grid>
  );
}
