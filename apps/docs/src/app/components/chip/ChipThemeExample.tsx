import { Chip } from "@react-md/core";
import { type ReactElement } from "react";

export default function ChipThemesExample(): ReactElement {
  return (
    <>
      <Chip theme="solid">Solid</Chip>
      <Chip theme="outline">Outlined</Chip>
    </>
  );
}
