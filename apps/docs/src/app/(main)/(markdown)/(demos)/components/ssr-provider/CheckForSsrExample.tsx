"use client";

import { useSsr } from "@react-md/core/SsrProvider";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement, useRef } from "react";

export default function CheckForSsrExample(): ReactElement {
  const ssr = useSsr();
  const ssrValue = useRef("");
  const clientValue = useRef("");
  if (ssr && !ssrValue.current) {
    ssrValue.current = "Hello";
  }
  if (!ssr && !clientValue.current) {
    clientValue.current = "World!";
  }

  return (
    <Typography>
      {ssrValue.current}
      {clientValue.current}
    </Typography>
  );
}
