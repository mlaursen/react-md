import { Box } from "@react-md/core/box/Box";
import { box } from "@react-md/core/box/styles";
import { button } from "@react-md/core/button/buttonStyles";
import { Card } from "@react-md/core/card/Card";
import { ResponsiveItem } from "@react-md/core/responsive-item/ResponsiveItem";
import { ResponsiveItemOverlay } from "@react-md/core/responsive-item/ResponsiveItemOverlay";
import { Typography } from "@react-md/core/typography/Typography";
import InfoOutlineIcon from "@react-md/material-icons/InfoOutlineIcon";
import { type ReactElement } from "react";

export default function ResponsiveItemOverlayExample(): ReactElement {
  return (
    <Box grid fullWidth>
      <Card>
        <ResponsiveItem>
          <img
            src="https://picsum.photos/800/800?image=432"
            alt="green trees, grass, and lake at sunrise"
          />
          <ResponsiveItemOverlay
            className={box({ justify: "space-between", disablePadding: true })}
          >
            <Typography type="headline-5" margin="none">
              Photo by: Michael Hull
            </Typography>
            <a
              aria-label="Unsplash photo source"
              rel="noreferrer"
              href="https://unsplash.com/photos/photo-of-green-trees-grass-and-lake-at-sunrise-vuWB5mGu5wE"
              target="_blank"
              className={button({ buttonType: "icon" })}
            >
              <InfoOutlineIcon />
            </a>
          </ResponsiveItemOverlay>
        </ResponsiveItem>
      </Card>
    </Box>
  );
}
