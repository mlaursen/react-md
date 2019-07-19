import React, { FC, Fragment } from "react";
import {
  MediaContainer,
  MediaOverlay,
  MediaOverlayPosition,
} from "@react-md/media";
import { Text } from "@react-md/typography";

const positions: MediaOverlayPosition[] = [
  "top",
  "right",
  "bottom",
  "left",
  "middle",
  "center",
  "absolute-center",
];

const WithOverlay: FC = () => (
  <Fragment>
    {positions.map((position, i) => (
      <MediaContainer
        key={position}
        id={`overlay-container-${i}`}
        height={9}
        width={16}
        className="responsive-item"
      >
        <img
          src={`https://picsum.photos/800/800?image=43${i}`}
          alt=""
          aria-describedby={`overlay-container-overlay-${i}`}
        />
        <MediaOverlay id={`overlay-container-overlay-${i}`} position={position}>
          <Text
            type="headline-5"
            margin="none"
            align={
              ["left", "right", "center"].includes(position)
                ? "center"
                : undefined
            }
          >
            This is a random picture!
          </Text>
        </MediaOverlay>
      </MediaContainer>
    ))}
  </Fragment>
);

export default WithOverlay;
