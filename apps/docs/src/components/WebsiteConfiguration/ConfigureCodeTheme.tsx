import { usePrismThemeContext } from "@/providers/PrismThemeProvider.jsx";
import { PRISM_THEMES } from "@/prism-themes/themes.js";
import { Box, Option, Overlay, Select, Typography } from "@react-md/core";
import { useId, type ReactElement } from "react";

export function ConfigureCodeTheme(): ReactElement {
  const { prismTheme, setPrismTheme } = usePrismThemeContext();
  const labelId = useId();
  return (
    <Box stacked fullWidth disablePadding align="stretch">
      <Typography id={labelId} margin="none">
        Code Theme
      </Typography>
      <Select
        aria-labelledby={labelId}
        name="theme"
        value={prismTheme}
        onChange={(event) => setPrismTheme(event.currentTarget.value)}
      >
        {PRISM_THEMES.map((theme) => (
          <Option key={theme} value={theme}>
            {theme}
          </Option>
        ))}
        <Overlay visible noOpacity />
      </Select>
    </Box>
  );
}
