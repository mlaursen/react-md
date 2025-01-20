"use client";

import { Box } from "@react-md/core/box/Box";
import { AsyncButton } from "@react-md/core/button/AsyncButton";
import { Switch } from "@react-md/core/form/Switch";
import { type ReactElement, useState } from "react";

export default function ManualLoadingState(): ReactElement {
  const [loading, setLoading] = useState(false);

  return (
    <Box stacked align="stretch">
      <Switch
        label="Loading?"
        checked={loading}
        onChange={(event) => {
          setLoading(event.currentTarget.checked);
        }}
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
