import type { Dir } from "@react-md/core";
import { Box, Button, Fieldset, Legend, useDir } from "@react-md/core";
import type { ReactElement } from "react";

const modes: readonly Dir[] = ["ltr", "rtl"];

export function WritingDirectionButtons(): ReactElement {
  const { dir: currentDir, toggleDir } = useDir();
  return (
    <Fieldset>
      <Box stacked disablePadding align="start">
        <Legend>Orientation</Legend>
        <Box disablePadding>
          {modes.map((dir) => (
            <Button
              key={dir}
              theme={dir === currentDir ? "primary" : undefined}
              themeType={dir === currentDir ? "contained" : "outline"}
              onClick={toggleDir}
            >
              {dir}
            </Button>
          ))}
        </Box>
      </Box>
    </Fieldset>
  );
}
