import { ReactElement } from "react";
import { Typography } from "@react-md/typography";
import {
  AccessAlarmFontIcon,
  AccessAlarmSVGIcon,
  Rotation3DFontIcon, // the sprite name for this was 3d_rotation.svg
  Rotation3DSVGIcon, // the sprite name for this was 3d_rotation.svg
  TvFontIcon,
  TvSVGIcon,
  HomeFontIcon,
  HomeSVGIcon,
} from "@react-md/material-icons";

import styles from "./SimpleExamples.module.scss";

export default function SimpleExamples(): ReactElement {
  return (
    <div className={styles.container}>
      <Typography type="headline-4">Font Icon Versions</Typography>
      <AccessAlarmFontIcon />
      <Rotation3DFontIcon />
      <HomeFontIcon />
      <TvFontIcon />
      <Typography type="headline-4">SVG Icon Versions</Typography>
      <AccessAlarmSVGIcon />
      <Rotation3DSVGIcon />
      <HomeSVGIcon />
      <TvSVGIcon />
    </div>
  );
}
