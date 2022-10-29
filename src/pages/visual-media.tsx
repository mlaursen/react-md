import { Card } from "@react-md/card";
import { Box, TextContainer, Typography } from "@react-md/core";
import type { MediaOverlayPosition } from "@react-md/visual-media";
import {
  VisualMediaContainer,
  VisualMediaOverlay,
} from "@react-md/visual-media";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "src/components/DemoHeadingWithDivider";
import image1 from "src/pexels/pexels-jaime-reimer-2662116-600x427.jpg";
import image2 from "src/pexels/pexels-james-wheeler-1539225-300x200.jpg";
import image3 from "src/pexels/pexels-mateusz-sałaciak-4275885-100x110.jpg";
import image4 from "src/pexels/pexels-eberhard-grossgasteiger-1417647-300x300.jpg";

const images = [image1.src, image2.src, image3.src, image4.src];

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
          <img src={image4.src} alt="" />
        </VisualMediaContainer>
        <VisualMediaContainer aspectRatio="1-1">
          <img src={image1.src} alt="" />
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
        {positions.map((position) => (
          <VisualMediaContainer key={position} aspectRatio="16-9">
            <img src={image1.src} alt="" />
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
