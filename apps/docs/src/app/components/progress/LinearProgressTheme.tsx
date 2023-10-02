import { Box, LinearProgress, Switch } from "@react-md/core";
import { useState, type ReactElement } from "react";

export default function LinearProgressTheme(): ReactElement {
  const [checked, setChecked] = useState(false);
  const value = checked ? undefined : 30;
  return (
    <>
      <LinearProgress value={value} theme="primary" />
      <LinearProgress value={value} theme="secondary" />
      <LinearProgress value={value} theme="warning" />
      <LinearProgress value={value} theme="success" />
      <LinearProgress value={value} theme="error" />
      <LinearProgress value={checked ? undefined : 30} theme="current-color" />
      <Box disablePadding fullWidth>
        <Switch
          label="Run"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
      </Box>
    </>
  );
}
