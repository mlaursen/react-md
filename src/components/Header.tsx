import { AppBar } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { useColorScheme, useDir } from "@react-md/core";
import { VerticalDivider } from "@react-md/divider";
import type { ReactElement } from "react";
import styles from "./Header.module.scss";
import { StyledLink } from "./StyledLink";

export function Header(): ReactElement {
  const { dir, toggleDir } = useDir();
  const { colorSchemeMode, setColorSchemeMode } = useColorScheme();
  return (
    <AppBar className={styles.container}>
      <div className={styles.links}>
        <StyledLink href="/">Home</StyledLink>
        <StyledLink href="/app-bar">AppBar</StyledLink>
        <StyledLink href="/avatar">Avatar</StyledLink>
        <StyledLink href="/button">Button</StyledLink>
        <StyledLink href="/box-shadow">Box Shadow</StyledLink>
        <StyledLink href="/dialog">Dialog</StyledLink>
        <StyledLink href="/divider">Divider</StyledLink>
        <StyledLink href="/link">Link</StyledLink>
        <StyledLink href="/progress">Progress</StyledLink>
        <StyledLink href="/typography">Typography</StyledLink>
        <VerticalDivider maxHeight={0} />
        <StyledLink href="/coverage/lcov-report/index.html" target="_blank">
          Test Coverage
        </StyledLink>
        <StyledLink href="/docs/index.html" target="_blank">
          Typedoc
        </StyledLink>
      </div>
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
