import { GoogleTagManager } from "@next/third-parties/google";
import { type ReactElement } from "react";

import { GTAG_ID } from "@/constants/env.js";

export function GtagAnalytics(): ReactElement | null {
  if (!GTAG_ID) {
    return null;
  }

  return <GoogleTagManager gtmId={GTAG_ID} />;
}
