import React, { FC } from "react";
import cn from "classnames";
import { TextIconSpacing } from "@react-md/icon";
import { HomeSVGIcon } from "@react-md/material-icons";
import { MediaContainer } from "@react-md/media";
import { Text, TextContainer } from "@react-md/typography";

import LinkButton from "components/LinkButton";

import NotFoundSVG from "./NotFoundSVG";
import styles from "./NotFoundPage.module.scss";

interface Props {
  className?: string;
}

const NotFoundPage: FC<Props> = ({ className }) => {
  return (
    <MediaContainer
      className={cn(styles.container, className)}
      height={9}
      width={16}
    >
      <NotFoundSVG />
      <Text type="headline-2" className={styles.uhh}>
        Uhhh...
      </Text>
      <TextContainer className={styles.message}>
        <Text type="headline-6">
          Looks like this page can&apos;t be found. You can try using the
          navigation tree to find a specific page or return the home page with
          the link below.
        </Text>
      </TextContainer>
      <LinkButton
        id="go-home-link"
        href="/"
        className={styles.link}
        theme="secondary"
        themeType="contained"
      >
        <TextIconSpacing icon={<HomeSVGIcon />}>Home</TextIconSpacing>
      </LinkButton>
    </MediaContainer>
  );
};

export default NotFoundPage;
