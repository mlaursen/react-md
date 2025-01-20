import { Box } from "@react-md/core/box/Box";
import { Switch } from "@react-md/core/form/Switch";
import { LinearProgress } from "@react-md/core/progress/LinearProgress";
import { type ReactElement, useState } from "react";

export default function LinearProgressTheme(): ReactElement {
  const [checked, setChecked] = useState(false);
  const value = checked ? undefined : 30;
  return (
    <>
      <LinearProgress aria-label="Example" value={value} theme="primary" />
      <LinearProgress aria-label="Example" value={value} theme="secondary" />
      <LinearProgress aria-label="Example" value={value} theme="warning" />
      <LinearProgress aria-label="Example" value={value} theme="success" />
      <LinearProgress aria-label="Example" value={value} theme="error" />
      <LinearProgress
        aria-label="Example"
        value={checked ? undefined : 30}
        theme="current-color"
      />
      <Box disablePadding fullWidth>
        <Switch
          label="Run"
          checked={checked}
          onChange={(event) => {
            setChecked(event.currentTarget.checked);
          }}
        />
      </Box>
    </>
  );
}
