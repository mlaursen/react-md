"use client";
import { useAppSize } from "@react-md/core/media-queries/AppSizeProvider";
import { type ReactElement } from "react";

export default function UseAppSizeExample(): ReactElement {
  const { isDesktop, isLandscape, isLargeDesktop, isPhone, isTablet } =
    useAppSize();

  return (
    <pre>
      <code>
        {JSON.stringify(
          {
            isPhone,
            isTablet,
            isDesktop,
            isLargeDesktop,
            isLandscape,
          },
          null,
          2
        )}
      </code>
    </pre>
  );
}
