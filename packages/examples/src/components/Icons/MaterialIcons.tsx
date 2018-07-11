import * as React from "react";
import { AddSVGIcon, AddCircleFontIcon, AlarmSVGIcon, AlarmFontIcon } from "@react-md/material-icons";

const MaterialIcons: React.SFC<{}> = () => (
  <React.Fragment>
    <AddSVGIcon className="example-group__example" />
    <AddCircleFontIcon className="example-group__example" />
    <AlarmSVGIcon className="example-group__example" />
    <AlarmFontIcon className="example-group__example" />
  </React.Fragment>
);

export default MaterialIcons;
