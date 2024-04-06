import { SegmentedButtonGroup } from "@/components/SegmentedButtonGroup.jsx";
import { useDir, type Dir } from "react-md";
import FormatTextdirectionLToROutlinedIcon from "@react-md/material-icons/FormatTextdirectionLToROutlinedIcon";
import FormatTextdirectionRToLOutlinedIcon from "@react-md/material-icons/FormatTextdirectionRToLOutlinedIcon";
import { type ReactElement, type ReactNode } from "react";

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
