import React, { FC } from "react";
import { MediaContainer } from "@react-md/media";
import { bem } from "@react-md/theme";
import { Text, TextContainer } from "@react-md/typography";

import "./not-found-page.scss";
import { Component as NotFoundSVG } from "./404.svg";
import LinkButton from "components/LinkButton";
import { TextIconSpacing } from "@react-md/icon";
import { HomeSVGIcon } from "@react-md/material-icons";

const block = bem("not-found");

const NotFoundPage: FC = () => {
  return (
    <MediaContainer className={block()} height={9} width={16}>
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
        <TextIconSpacing icon={<HomeSVGIcon role="presentation" />}>
          Home
        </TextIconSpacing>
      </LinkButton>
    </MediaContainer>
  );
};

export default NotFoundPage;
