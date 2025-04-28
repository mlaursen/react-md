import type { ReactElement } from "react";
import { ResponsiveItem, ResponsiveItemOverlay, Typography, ResponsiveItemOverlayPosition } from "react-md";

import styles from "./Container.module.scss";

const positions: ResponsiveItemOverlayPosition[] = [
  "top",
  "right",
  "bottom",
  "left",
  "middle",
  "center",
  "absolute-center",
];

export default function WithOverlay(): ReactElement {
  return (
    <>
      {positions.map((position, i) => (
        <ResponsiveItem
          key={position}
          id={`overlay-container-${i}`}
          className={styles.container}
          aspectRatio="16-9">
          <img
            src={`https://picsum.photos/800/800?image=43${i}`}
            alt=""
            aria-describedby={`overlay-container-overlay-${i}`}
          />
          <ResponsiveItemOverlay
            id={`overlay-container-overlay-${i}`}
            position={position}
          >
            <Typography
              type="headline-5"
              margin="none"
              align={
                ["left", "right", "center"].includes(position)
                  ? "center"
                  : undefined
              }
            >
              This is a random picture!
            </Typography>
          </ResponsiveItemOverlay>
        </ResponsiveItem>
      ))}
    </>
  );
}

