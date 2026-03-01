import { type ReactElement } from "react";

import { Buttons } from "./Buttons";
import { ConfigureColorScheme } from "./ConfigureColorScheme";
import { IconsExample } from "./IconsExample";
import { PaletteExample } from "./PaletteExample";
import { TypographyExample } from "./TypographyExample";

export function Playground(): ReactElement {
  return (
    <>
      <ConfigureColorScheme />
      <hr />
      <PaletteExample />
      <hr />
      <IconsExample />
      <hr />
      <TypographyExample />
      <hr />
      <Buttons />
    </>
  );
}
