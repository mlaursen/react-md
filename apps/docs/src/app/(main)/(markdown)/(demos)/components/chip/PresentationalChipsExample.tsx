import { Chip } from "@react-md/core/chip/Chip";
import { chip } from "@react-md/core/chip/styles";
import { type ReactElement } from "react";

export default function PresentationalChipsExample(): ReactElement {
  return (
    <>
      <Chip noninteractive>Tag 1</Chip>
      <span className={chip()}>Tag 2</span>
      <Chip noninteractive theme="outline">
        Tag 3
      </Chip>
      <span className={chip({ theme: "outline" })}>Tag 4</span>
      <Chip noninteractive selected selectedThemed>
        Tag 5
      </Chip>
      <span className={chip({ selected: true, selectedThemed: true })}>
        Tag 6
      </span>
    </>
  );
}
