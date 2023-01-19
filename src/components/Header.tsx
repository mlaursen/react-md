import { AppBar } from "@react-md/app-bar";
import {
  Box,
  Button,
  useColorScheme,
  useDir,
  VerticalDivider,
} from "@react-md/core";
import type { ReactElement } from "react";
import styles from "./Header.module.scss";
import { StyledLink } from "./StyledLink";

export function Header(): ReactElement {
  const { dir, toggleDir } = useDir();
  const { colorSchemeMode, setColorSchemeMode } = useColorScheme();
  return (
    <AppBar className={styles.container} scrollbarOffset>
      <Box className={styles.links} disableWrap disablePadding>
        <StyledLink href="/">Home</StyledLink>
        <StyledLink href="/app-bar">AppBar</StyledLink>
        <StyledLink href="/avatar">Avatar</StyledLink>
        <StyledLink href="/box">Box</StyledLink>
        <StyledLink href="/core">Button</StyledLink>
        <StyledLink href="/box-shadow">Box Shadow</StyledLink>
        <StyledLink href="/dialog">Dialog</StyledLink>
        <StyledLink href="/divider">Divider</StyledLink>
        <StyledLink href="/link">Link</StyledLink>
        <StyledLink href="/list">List</StyledLink>
        <StyledLink href="/material-icons">Material Icons</StyledLink>
        <StyledLink href="/progress">Progress</StyledLink>
        <StyledLink href="/tree">Tree</StyledLink>
        <StyledLink href="/typography">Typography</StyledLink>
        <VerticalDivider maxHeight={0} />
        <StyledLink href="/coverage/lcov-report/index.html" target="_blank">
          Test Coverage
        </StyledLink>
        <StyledLink href="/docs/index.html" target="_blank">
          Typedoc
        </StyledLink>
      </Box>
      <Button
        onClick={toggleDir}
        style={{
          marginLeft: dir === "ltr" ? "auto" : undefined,
          marginRight: dir === "rtl" ? "auto" : undefined,
        }}
      >
        {dir}
      </Button>
      <Button
        onClick={() => {
          setColorSchemeMode((mode) => {
            if (mode === "dark") {
              return "system";
            }
            if (mode === "system") {
              return "light";
            }

            return "dark";
          });
        }}
      >
        {colorSchemeMode}
      </Button>
    </AppBar>
  );
}
