"use client";

import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement } from "react";

import { Playground } from "./Playground.jsx";

export function PlaygroundContainer(): ReactElement {
  const { toggle, toggled } = useToggle();

  return <Playground key={`${toggled}`} onReset={toggle} />;
}
