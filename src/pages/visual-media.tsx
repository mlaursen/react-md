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
  "/200/300?image=30",
  "/300/200?image=3",
  "/300?image=1008",
  "/100/110?image=233",
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
      <Box flexDirection="column" alignItems="stretch">
        <DemoHeadingWithDivider margin="none">
          Simple Responsive Images
        </DemoHeadingWithDivider>
        <Card>
          <Box alignItems="start">
            {images.map((image, i) => (
              <VisualMediaContainer key={i}>
                <img src={`https://picsum.photos${image}`} alt="" />
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
        <DemoHeadingWithDivider>Forced Aspect Ratio</DemoHeadingWithDivider>
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
                This is a random picture!
              </Typography>
            </VisualMediaOverlay>
          </VisualMediaContainer>
        ))}
      </Box>
    </TextContainer>
  );
}
