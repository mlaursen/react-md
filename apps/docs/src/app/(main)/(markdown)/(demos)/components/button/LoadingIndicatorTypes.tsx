"use client";
import { Box } from "@react-md/core/box/Box";
import { AsyncButton } from "@react-md/core/button/AsyncButton";
import { Switch } from "@react-md/core/form/Switch";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { useState, type ReactElement } from "react";

export default function LoadingIndicatorTypes(): ReactElement {
  const [loading, setLoading] = useState(false);

  return (
    <Box stacked align="stretch">
      <Switch
        label="Loading?"
        checked={loading}
        onChange={(event) => setLoading(event.currentTarget.checked)}
      />
      <AsyncButton
        loading={loading}
        theme="secondary"
        themeType="flat"
        loadingType="circular-overlay"
      >
        Circular Overlay
      </AsyncButton>
      <AsyncButton
        loading={loading}
        theme="clear"
        themeType="outline"
        loadingType="linear-above"
      >
        Linear Above
      </AsyncButton>
      <AsyncButton
        loading={loading}
        theme="secondary"
        themeType="outline"
        loadingType="linear-below"
      >
        Linear Below
      </AsyncButton>
      <AsyncButton
        loading={loading}
        theme="primary"
        themeType="contained"
        loadingType="circular-before"
        beforeAddon={<FavoriteIcon />}
      >
        Circular Before
      </AsyncButton>
      <AsyncButton
        loading={loading}
        theme="warning"
        themeType="contained"
        loadingType="circular-after"
        afterAddon={<FavoriteIcon />}
      >
        Circular After
      </AsyncButton>
    </Box>
  );
}
