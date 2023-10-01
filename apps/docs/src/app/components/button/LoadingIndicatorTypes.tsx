import { AsyncButton, Box } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { useState, type ReactElement, useEffect } from "react";

export default function LoadingIndicatorTypes(): ReactElement {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const interval = window.setInterval(() => {
      setLoading((prev) => !prev);
    }, 5000);
    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <Box>
      <AsyncButton
        loading={loading}
        theme="clear"
        themeType="flat"
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
        theme="secondary"
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
