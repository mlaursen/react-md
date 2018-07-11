import * as React from "react";
import { Text } from "@react-md/typography";
import { FontIcon } from "@react-md/icon";
// import { AccessAlarmFontIcon, AccessAlarmSVGIcon } from "@react-md/material-icons";

const FontIcons: React.SFC<{}> = () => (
  <React.Fragment>
    <Text type="headline-6">Using material icon font icons</Text>
    <FontIcon className="example-group__example">home</FontIcon>
    <FontIcon className="example-group__example">favorite</FontIcon>
    <Text type="headline-6">Using font-awesome font icons</Text>
    <FontIcon className="example-group__example" iconClassName="fa fa-star-o" />
    <FontIcon className="example-group__example" iconClassName="fa fa-book" />
  </React.Fragment>
);

export default FontIcons;
