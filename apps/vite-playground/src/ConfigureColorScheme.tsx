import { Box } from "@react-md/core/box/Box";
import { useStorage } from "@react-md/core/storage/useStorage";
import { Button } from "@react-md/you/button/Button";
import { MaterialSymbol } from "@react-md/you/icon/MaterialSymbol";
import { Typography } from "@react-md/you/typography/Typography";
import { type ReactElement, useEffect } from "react";

import {
  COLOR_SCHEMES,
  COLOR_SCHEME_STORAGE_CONFIG,
  setRootColorScheme,
} from "./colorScheme";

export function ConfigureColorScheme(): ReactElement {
  const { value, setValue } = useStorage(COLOR_SCHEME_STORAGE_CONFIG);
  useEffect(() => {
    setRootColorScheme(value);
    return () => {
      document.documentElement.style.removeProperty("colorScheme");
    };
  }, [value]);

  return (
    <Box stacked>
      <Typography>Color Scheme</Typography>
      <Box disablePadding>
        {COLOR_SCHEMES.map((colorScheme) => (
          <Button
            key={colorScheme}
            onClick={() => {
              setValue(colorScheme);
            }}
          >
            {colorScheme === value && <MaterialSymbol name="check" />}
            {colorScheme}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
