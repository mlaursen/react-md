import { Box, link, TextContainer, Typography } from "@react-md/core";
import BuildIcon from "@react-md/material-icons/BuildIcon";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import DeleteIcon from "@react-md/material-icons/DeleteIcon";
import EmailIcon from "@react-md/material-icons/EmailIcon";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import HomeIcon from "@react-md/material-icons/HomeIcon";
import ImageIcon from "@react-md/material-icons/ImageIcon";
import InfoIcon from "@react-md/material-icons/InfoIcon";
import PauseIcon from "@react-md/material-icons/PauseIcon";
import StarIcon from "@react-md/material-icons/StarIcon";
import WatchIcon from "@react-md/material-icons/WatchIcon";
import Link from "next/link";
import type { ReactElement } from "react";
import { Blockquote } from "../Blockquote";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";

export default function IconExamples(): ReactElement {
  return (
    <Box stacked>
      <Blockquote>
        <Typography>
          <InfoIcon inline className="rmd-icon--before" />
          Check out the{" "}
          <Link href="/material-icons-and-symbols" className={link()}>
            Material Symbols and Icons page
          </Link>{" "}
          to see all the available icons and how to use them.
        </Typography>
      </Blockquote>
      <DemoHeadingWithDivider>Color Example</DemoHeadingWithDivider>
      <Box>
        <EmailIcon />
        <HomeIcon color="primary" />
        <FavoriteIcon color="secondary" />
        <BuildIcon color="warning" />
        <StarIcon color="success" />
        <DeleteIcon color="error" />
        <CloseIcon color="text-primary" />
        <ImageIcon color="text-secondary" />
        <PauseIcon color="text-hint" />
        <WatchIcon color="text-disabled" />
      </Box>
      <DemoHeadingWithDivider>Dense Color Example</DemoHeadingWithDivider>
      <Box>
        <EmailIcon dense />
        <HomeIcon dense color="primary" />
        <FavoriteIcon dense color="secondary" />
        <BuildIcon dense color="warning" />
        <StarIcon dense color="success" />
        <DeleteIcon dense color="error" />
        <CloseIcon dense color="text-primary" />
        <ImageIcon dense color="text-secondary" />
        <PauseIcon dense color="text-hint" />
        <WatchIcon dense color="text-disabled" />
      </Box>
      <DemoHeadingWithDivider>Inline Example</DemoHeadingWithDivider>
      <TextContainer>
        <Typography>
          <InfoIcon color="success" inline className="rmd-icon--before" />
          The icon should be displayed inline with text event when the text line
          wraps. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
          dictum sodales sem, non molestie nunc mollis at.
        </Typography>
      </TextContainer>
    </Box>
  );
}
