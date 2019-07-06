import React, { FC } from "react";
import cn from "classnames";
import { TextIconSpacing } from "@react-md/icon";
import { HomeSVGIcon } from "@react-md/material-icons";
import { MediaContainer } from "@react-md/media";
import { bem } from "@react-md/theme";
import { Text, TextContainer } from "@react-md/typography";

import LinkButton from "components/LinkButton";

import "./NotFoundPage.scss";
import { Component as NotFoundSVG } from "./404.svg";

const block = bem("not-found");

interface Props {
  className?: string;
}

const NotFoundPage: FC<Props> = ({ className }) => {
  return (
    <MediaContainer className={cn(block(), className)} height={9} width={16}>
      <NotFoundSVG />
      <Text type="headline-2" className={block("uhh")}>
        Uhhh...
      </Text>
      <TextContainer className={block("message")}>
        <Text type="headline-6">
          Looks like this page can't be found. You can try using the navigation
          tree to find a specific page or return the home page with the link
          below.
        </Text>
      </TextContainer>
      <LinkButton
        id="go-home-link"
        href="/"
        className={block("home")}
        theme="secondary"
        themeType="contained"
      >
        <TextIconSpacing icon={<HomeSVGIcon />}>Home</TextIconSpacing>
      </LinkButton>
    </MediaContainer>
  );
};

export default NotFoundPage;
