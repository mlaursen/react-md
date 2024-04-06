import { ButtonStyledLink } from "@/components/ButtonStyledLink.jsx";
import { ReactMDLogo } from "@/components/ReactMDLogo.jsx";
import { DEFAULT_TITLE } from "@/constants/metadata.js";
import { Box } from "@react-md/core/box/Box";
import { TextContainer } from "@react-md/core/typography/TextContainer";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";
import styles from "./HomePageBanner.module.scss";
import { HomePageBannerContainer } from "./HomePageBannerContainer.jsx";

export function HomePageBanner(): ReactElement {
  return (
    <HomePageBannerContainer>
      <TextContainer>
        <Typography type="headline-2">react-md</Typography>
        <ReactMDLogo className={styles.logo} />
        <Typography type="headline-5" as="p">
          {DEFAULT_TITLE}.
        </Typography>
      </TextContainer>
      <Box align="center" justify="center">
        <ButtonStyledLink
          href="/getting-started/installation"
          theme="secondary"
          themeType="contained"
        >
          Get started
        </ButtonStyledLink>
        <ButtonStyledLink href="/components/button" themeType="contained">
          See Components
        </ButtonStyledLink>
      </Box>
    </HomePageBannerContainer>
  );
}
