import { Card } from "@react-md/card";
import type { ResponsiveItemOverlayPosition } from "@react-md/core";
import {
  Box,
  ResponsiveItemContainer,
  ResponsiveItemOverlay,
  TextContainer,
  Typography,
} from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "src/components/DemoHeadingWithDivider";

const images = [
  "https://picsum.photos/200/300?image=30",
  "https://picsum.photos/300/200?image=3",
  "https://picsum.photos/300?image=1008",
  "https://picsum.photos/100/110?image=233",
];

const positions: ResponsiveItemOverlayPosition[] = [
  "top",
  "right",
  "bottom",
  "left",
  "middle",
  "center",
  "absolute-center",
];

export default function ResponsiveItemPage(): ReactElement {
  return (
    <TextContainer>
      <Box stacked align="stretch">
        <DemoHeadingWithDivider margin="none">
          Simple Responsive Images
        </DemoHeadingWithDivider>
        <Card>
          <Box align="start">
            {images.map((src, i) => (
              <ResponsiveItemContainer key={i}>
                <img src={src} alt="" />
              </ResponsiveItemContainer>
            ))}
          </Box>
        </Card>
        <DemoHeadingWithDivider>Forced Aspect Ratio</DemoHeadingWithDivider>
        <ResponsiveItemContainer aspectRatio="16-9">
          <img src="https://picsum.photos/400/300?image=3" alt="" />
        </ResponsiveItemContainer>
        <ResponsiveItemContainer aspectRatio="1-1">
          <img src="https://picsum.photos/400/300?image=623" alt="" />
        </ResponsiveItemContainer>
        <ResponsiveItemContainer aspectRatio="16-9">
          <iframe
            src="https://www.youtube.com/embed/kyAn3fSs8_A"
            allowFullScreen
            frameBorder="0"
            title="YouTube Video"
          />
        </ResponsiveItemContainer>
        <DemoHeadingWithDivider>With Overlay</DemoHeadingWithDivider>
        {/* TODO: Update this is it is copy/paste-able instead */}
        {positions.map((position, i) => (
          <ResponsiveItemContainer key={position} aspectRatio="16-9">
            <img src={`https://picsum.photos/800/800?image=43${i}`} alt="" />
            <ResponsiveItemOverlay position={position}>
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
            </ResponsiveItemOverlay>
          </ResponsiveItemContainer>
        ))}
      </Box>
    </TextContainer>
  );
}
