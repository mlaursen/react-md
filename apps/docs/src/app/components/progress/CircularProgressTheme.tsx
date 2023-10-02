import { Box, CircularProgress, Switch } from "@react-md/core";
import { useState, type ReactElement } from "react";

export default function CircularProgressTheme(): ReactElement {
  const [checked, setChecked] = useState(false);
  const value = checked ? undefined : 30;
  return (
    <>
      <CircularProgress value={value} theme="primary" />
      <CircularProgress value={value} theme="secondary" />
      <CircularProgress value={value} theme="warning" />
      <CircularProgress value={value} theme="success" />
      <CircularProgress value={value} theme="error" />
      <CircularProgress
        value={checked ? undefined : 30}
        theme="current-color"
      />
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
