import { Chip } from "@react-md/core/chip/Chip";
import { type ReactElement } from "react";

export default function DisabledChipExample(): ReactElement {
  return (
    <>
      <Chip theme="solid" disabled>
        Solid
      </Chip>
      <Chip theme="outline" disabled>
        Outlined
      </Chip>
    </>
  );
}
