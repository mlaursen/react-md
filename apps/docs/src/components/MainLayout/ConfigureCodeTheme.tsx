import { Box } from "@react-md/core/box/Box";
import { Option } from "@react-md/core/form/Option";
import { Select } from "@react-md/core/form/Select";
import { Overlay } from "@react-md/core/overlay/Overlay";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement, useId } from "react";

import { usePrismThemeContext } from "@/components/PrismThemeProvider.js";
import { PRISM_THEMES } from "@/constants/prismThemes.js";

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
        onChange={(event) => {
          setPrismTheme(event.currentTarget.value);
        }}
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
