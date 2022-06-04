import { Button } from "@react-md/button";
import { useColorScheme, useDir } from "@react-md/core";
import type { ReactElement } from "react";
import styles from "./Header.module.scss";
import { StyledLink } from "./StyledLink";

export function Header(): ReactElement {
  const { dir, toggleDir } = useDir();
  const { colorSchemeMode, setColorSchemeMode } = useColorScheme();
  return (
    <nav className={styles.container}>
      <StyledLink href="/">Home</StyledLink>
      <StyledLink href="/app-bar">AppBar</StyledLink>
      <StyledLink href="/button">Button</StyledLink>
      <StyledLink href="/box-shadow">Box Shadow</StyledLink>
      <StyledLink href="/progress">Progress</StyledLink>
      <StyledLink href="/typography">Typography</StyledLink>
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
      <StyledLink href="/coverage/lcov-report/index.html" target="_blank">
        Test Coverage
      </StyledLink>
      <StyledLink href="/docs/index.html" target="_blank">
        Typedoc
      </StyledLink>
    </nav>
  );
}
