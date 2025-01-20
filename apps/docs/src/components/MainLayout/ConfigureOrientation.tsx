import {
  type Dir,
  useDir,
} from "@react-md/core/typography/WritingDirectionProvider";
import FormatTextdirectionLToROutlinedIcon from "@react-md/material-icons/FormatTextdirectionLToROutlinedIcon";
import FormatTextdirectionRToLOutlinedIcon from "@react-md/material-icons/FormatTextdirectionRToLOutlinedIcon";
import { type ReactElement, type ReactNode } from "react";

import { SegmentedButtonGroup } from "@/components/SegmentedButtonGroup.jsx";

const directions: readonly Dir[] = ["ltr", "rtl"];
const ICONS: Record<Dir, ReactNode> = {
  ltr: <FormatTextdirectionLToROutlinedIcon />,
  rtl: <FormatTextdirectionRToLOutlinedIcon />,
};

export function ConfigureOrientation(): ReactElement {
  const { dir, toggleDir } = useDir();
  return (
    <SegmentedButtonGroup
      label="Orientation"
      items={directions}
      icon={ICONS}
      value={dir}
      setValue={(nextDir) => {
        if (dir !== nextDir) {
          toggleDir();
        }
      }}
      textTransform="uppercase"
    />
  );
}
