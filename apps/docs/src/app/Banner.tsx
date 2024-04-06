import { ButtonStyledLink } from "@/components/ButtonStyledLink.jsx";
import Logo from "@/components/Logo.jsx";
import { DEFAULT_TITLE } from "@/constants/metadata.js";
import { Box, TextContainer, Typography } from "react-md";
import { type ReactElement } from "react";
import styles from "./Banner.module.scss";
import { BannerContainer } from "./BannerContainer.jsx";

export function Banner(): ReactElement {
  return (
    <BannerContainer>
      <TextContainer>
        <Typography type="headline-2">react-md</Typography>
        <Logo className={styles.logo} />
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
    </BannerContainer>
  );
}
