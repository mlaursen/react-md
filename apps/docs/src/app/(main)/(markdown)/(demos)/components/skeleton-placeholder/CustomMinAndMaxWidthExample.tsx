"use client";

import { SkeletonPlaceholder } from "@react-md/core/transition/SkeletonPlaceholder";
import { type ReactElement } from "react";

export default function CustomMinAndMaxWidthExample(): ReactElement {
  return <SkeletonPlaceholder minPercentage={20} maxPercentage={95} />;
}
