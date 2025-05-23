"use client";

import { useSkeletonPlaceholder } from "@react-md/core/transition/useSkeletonPlaceholder";
import { type ReactElement } from "react";

export default function UsingTheHookExample(): ReactElement {
  const { style, className } = useSkeletonPlaceholder();
  return <div style={style} className={className} />;
}
