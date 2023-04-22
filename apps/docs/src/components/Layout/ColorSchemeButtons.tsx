import type { ColorSchemeMode } from "@react-md/core";
import { Box, Button, Fieldset, Legend, useColorScheme } from "@react-md/core";
import type { ReactElement } from "react";

const modes: readonly ColorSchemeMode[] = ["light", "dark", "system"];

export function ColorSchemeButtons(): ReactElement {
  const { colorSchemeMode, setColorSchemeMode } = useColorScheme();
  return (
    <Fieldset>
      <Box stacked disablePadding align="start">
        <Legend>Color Scheme</Legend>
        <Box disablePadding>
          {modes.map((mode) => (
            <Button
              key={mode}
              theme={mode === colorSchemeMode ? "primary" : undefined}
              themeType={mode === colorSchemeMode ? "contained" : "outline"}
              onClick={() => {
                setColorSchemeMode(mode);
              }}
            >
              {mode}
            </Button>
          ))}
        </Box>
      </Box>
    </Fieldset>
  );
}
