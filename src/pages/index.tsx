import { Box, TextContainer, useColorScheme, useTheme } from "@react-md/core";
import { Fieldset, Form, Legend, Radio } from "@react-md/form";
import type { ReactElement } from "react";

export default function Home(): ReactElement {
  const theme = useTheme();
  const { colorSchemeMode, setColorSchemeMode } = useColorScheme();

  return (
    <TextContainer>
      <main>
        <Form>
          <Fieldset browserStyles>
            <Legend>Color Scheme</Legend>
            <Box disablePadding>
              <Radio
                label="Light"
                value="light"
                checked={colorSchemeMode === "light"}
                onChange={() => setColorSchemeMode("light")}
              />
              <Radio
                label="Dark"
                value="dark"
                checked={colorSchemeMode === "dark"}
                onChange={() => setColorSchemeMode("dark")}
              />
              <Radio
                label="System"
                value="system"
                checked={colorSchemeMode === "system"}
                onChange={() => setColorSchemeMode("system")}
              />
            </Box>
          </Fieldset>
        </Form>
        <pre>
          <code suppressHydrationWarning>{JSON.stringify(theme, null, 2)}</code>
        </pre>
      </main>
    </TextContainer>
  );
}
