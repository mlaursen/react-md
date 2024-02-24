"use client";
import { type ReactElement } from "react";
import { SkeletonPlaceholder } from "@react-md/core";

export default function CustomMinAndMaxWidthExample(): ReactElement {
  return <SkeletonPlaceholder minPercentage={20} maxPercentage={95} />;
}