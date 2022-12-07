import { Card } from "@react-md/card";
import { Box, TextContainer, Typography } from "@react-md/core";
import type { MediaOverlayPosition } from "@react-md/visual-media";
import {
  VisualMediaContainer,
  VisualMediaOverlay,
} from "@react-md/visual-media";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "src/components/DemoHeadingWithDivider";

const images = [
  "https://picsum.photos/200/300?image=30",
  "https://picsum.photos/300/200?image=3",
  "https://picsum.photos/300?image=1008",
  "https://picsum.photos/100/110?image=233",
];

const positions: MediaOverlayPosition[] = [
  "top",
  "right",
  "bottom",
  "left",
  "middle",
  "center",
  "absolute-center",
];

export default function VisualMediaPage(): ReactElement {
  return (
    <TextContainer>
      <Box stacked align="stretch">
        <DemoHeadingWithDivider margin="none">
          Simple Responsive Images
        </DemoHeadingWithDivider>
        <Card>
          <Box align="start">
            {images.map((src, i) => (
              <VisualMediaContainer key={i}>
                <img src={src} alt="" />
              </VisualMediaContainer>
            ))}
          </Box>
        </Card>
        <DemoHeadingWithDivider>Forced Aspect Ratio</DemoHeadingWithDivider>
        <VisualMediaContainer aspectRatio="16-9">
          <img src="https://picsum.photos/400/300?image=3" alt="" />
        </VisualMediaContainer>
        <VisualMediaContainer aspectRatio="1-1">
          <img src="https://picsum.photos/400/300?image=623" alt="" />
        </VisualMediaContainer>
        <VisualMediaContainer aspectRatio="16-9">
          <iframe
            src="https://www.youtube.com/embed/kyAn3fSs8_A"
            allowFullScreen
            frameBorder="0"
            title="YouTube Video"
          />
        </VisualMediaContainer>
        <DemoHeadingWithDivider>With Overlay</DemoHeadingWithDivider>
        {/* TODO: Update this is it is copy/paste-able instead */}
        {positions.map((position, i) => (
          <VisualMediaContainer key={position} aspectRatio="16-9">
            <img src={`https://picsum.photos/800/800?image=43${i}`} alt="" />
            <VisualMediaOverlay position={position}>
              <Typography
                type="headline-5"
                margin="none"
                align={
                  ["left", "right", "center"].includes(position)
                    ? "center"
                    : undefined
                }
              >
                Moraine Lake from Jaime Reimer
              </Typography>
            </VisualMediaOverlay>
          </VisualMediaContainer>
        ))}
      </Box>
    </TextContainer>
  );
}
