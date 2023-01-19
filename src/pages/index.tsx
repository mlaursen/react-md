import {
  Box,
  Fieldset,
  Form,
  Legend,
  Radio,
  TextContainer,
  useColorScheme,
  useTheme,
} from "@react-md/core";
import type { ReactElement } from "react";
import { CodeBlock } from "src/components/Code";

export default function Home(): ReactElement {
  const theme = useTheme();
  const { colorSchemeMode, setColorSchemeMode } = useColorScheme();

  return (
    <TextContainer>
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
      <CodeBlock suppressHydrationWarning language="json" lineNumbers={false}>
        {JSON.stringify(theme, null, 2)}
      </CodeBlock>
    </TextContainer>
  );
}
