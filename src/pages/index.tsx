/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { Button } from "@react-md/button";
import {
  TextContainer,
  Typography,
  useColorScheme,
  useTheme,
} from "@react-md/core";
import type { ReactElement } from "react";
import styles from "./index.module.scss";

export default function Home(): ReactElement {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  return (
    <TextContainer>
      {/* <TextContainer style={style}> */}
      <main>
        <form onSubmit={(event) => event.preventDefault()}>
          <label>
            Light
            <input
              type="radio"
              name="colorScheme"
              id="color-scheme-light"
              value="light"
              checked={colorScheme.colorSchemeMode === "light"}
              onChange={(event) => colorScheme.setColorSchemeMode("light")}
            />
          </label>
          <label>
            Dark
            <input
              type="radio"
              name="colorScheme"
              id="color-scheme-dark"
              value="dark"
              checked={colorScheme.colorSchemeMode === "dark"}
              onChange={(event) => colorScheme.setColorSchemeMode("dark")}
            />
          </label>
          <label>
            System
            <input
              type="radio"
              name="colorScheme"
              id="color-scheme-light"
              value="system"
              checked={colorScheme.colorSchemeMode === "system"}
              onChange={(event) => colorScheme.setColorSchemeMode("system")}
            />
          </label>
        </form>
        <pre>
          <code suppressHydrationWarning>{JSON.stringify(theme, null, 2)}</code>
        </pre>
      </main>
    </TextContainer>
  );
}
