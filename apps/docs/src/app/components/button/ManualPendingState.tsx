"use client";
import { AsyncButton, Box, Switch } from "react-md";
import { useState, type ReactElement } from "react";

export default function ManualLoadingState(): ReactElement {
  const [loading, setLoading] = useState(false);

  return (
    <Box stacked align="stretch">
      <Switch
        label="Loading?"
        checked={loading}
        onChange={(event) => setLoading(event.currentTarget.checked)}
      />
      <AsyncButton loading={loading} theme="clear" themeType="flat">
        Button
      </AsyncButton>
      <AsyncButton loading={loading} theme="primary" themeType="outline">
        Button
      </AsyncButton>
      <AsyncButton loading={loading} theme="secondary" themeType="contained">
        Button
      </AsyncButton>
    </Box>
  );
}
