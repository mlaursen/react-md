import { AsyncButton, Box } from "@react-md/core";
import { useEffect, useState, type ReactElement } from "react";

export default function ManualLoadingState(): ReactElement {
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
