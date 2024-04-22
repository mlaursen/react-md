"use client";
import { useSearchParams } from "next/navigation.js";
import { type NavigationType } from "./navTypes.js";

export function useNavType(): NavigationType {
  const searchParams = useSearchParams();
  const navType = searchParams.get("navType");

  return navType === "core" || navType === "list" || navType === "tree"
    ? navType
    : "core";
}
