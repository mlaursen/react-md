import React, { FC } from "react";
import { Text } from "@react-md/typography";
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

import "./simple-examples.scss";

const SimpleExamples: FC = () => (
  <div className="material-icons-container">
    <Text type="headline-4">Font Icon Versions</Text>
    <AccessAlarmFontIcon />
    <Rotation3DFontIcon />
    <HomeFontIcon />
    <TvFontIcon />
    <Text type="headline-4">SVG Icon Versions</Text>
    <AccessAlarmSVGIcon />
    <Rotation3DSVGIcon />
    <HomeSVGIcon />
    <TvSVGIcon />
  </div>
);

export default SimpleExamples;
