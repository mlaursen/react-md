import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { ResponsiveItemContainer } from "@react-md/core/responsive-item/ResponsiveItemContainer";
import { ResponsiveItemOverlay } from "@react-md/core/responsive-item/ResponsiveItemOverlay";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

export default function OverlayPositions(): ReactElement {
  return (
    <Box grid fullWidth gridColumns={1}>
      <Card>
        <ResponsiveItemContainer aspectRatio="16-9">
          <img src="https://picsum.photos/600/600?image=404" alt="" />
          <ResponsiveItemOverlay position="top">
            <Typography type="headline-5" margin="none">
              Top
            </Typography>
          </ResponsiveItemOverlay>
        </ResponsiveItemContainer>
      </Card>
      <Card>
        <ResponsiveItemContainer aspectRatio="16-9">
          <img src="https://picsum.photos/600/600?image=404" alt="" />
          <ResponsiveItemOverlay position="right">
            <Typography type="headline-5" margin="none">
              Right
            </Typography>
          </ResponsiveItemOverlay>
        </ResponsiveItemContainer>
      </Card>
      <Card>
        <ResponsiveItemContainer aspectRatio="16-9">
          <img src="https://picsum.photos/600/600?image=404" alt="" />
          <ResponsiveItemOverlay position="bottom">
            <Typography type="headline-5" margin="none">
              Bottom (default)
            </Typography>
          </ResponsiveItemOverlay>
        </ResponsiveItemContainer>
      </Card>
      <Card>
        <ResponsiveItemContainer aspectRatio="16-9">
          <img src="https://picsum.photos/600/600?image=404" alt="" />
          <ResponsiveItemOverlay position="left">
            <Typography type="headline-5" margin="none">
              Left
            </Typography>
          </ResponsiveItemOverlay>
        </ResponsiveItemContainer>
      </Card>
      <Card>
        <ResponsiveItemContainer aspectRatio="16-9">
          <img src="https://picsum.photos/600/600?image=404" alt="" />
          <ResponsiveItemOverlay position="middle">
            <Typography type="headline-5" margin="none" textAlign="center">
              Middle
            </Typography>
          </ResponsiveItemOverlay>
        </ResponsiveItemContainer>
      </Card>
      <Card>
        <ResponsiveItemContainer aspectRatio="16-9">
          <img src="https://picsum.photos/600/600?image=404" alt="" />
          <ResponsiveItemOverlay position="center">
            <Typography type="headline-5" margin="none" textAlign="center">
              Center
            </Typography>
          </ResponsiveItemOverlay>
        </ResponsiveItemContainer>
      </Card>
      <Card>
        <ResponsiveItemContainer aspectRatio="16-9">
          <img src="https://picsum.photos/600/600?image=404" alt="" />
          <ResponsiveItemOverlay position="absolute-center">
            <Typography type="headline-5" margin="none" textAlign="center">
              Absolute Center
            </Typography>
          </ResponsiveItemOverlay>
        </ResponsiveItemContainer>
      </Card>
    </Box>
  );
}
