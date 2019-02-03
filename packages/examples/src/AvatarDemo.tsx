import React, { FunctionComponent } from "react";
import { Avatar, AvatarScssVariables } from "@react-md/avatar";
import { TextContainer, Text } from "@react-md/typography";
import { HomeSVGIcon } from "@react-md/material-icons";
import { FontIcon } from "@react-md/icon";

interface IColorMap {
  name: string;
  value: { name: string; value: string }[];
}

const AvatarDemo: FunctionComponent = () => (
  <TextContainer>
    <Text type="headline-3">Avatar Demo</Text>
    <div className="flex-grid flex-grid--spaced">
      <Avatar src="https://picsum.photos/40/40?image=3" alt="An image" />
      <Avatar>A</Avatar>
      <Avatar>
        <HomeSVGIcon />
      </Avatar>
      <Avatar color="red">
        <FontIcon iconClassName="fa fa-rocket" />
      </Avatar>
    </div>
    <div className="flex-grid flex-grid--spaced">
      {Object.keys(AvatarScssVariables["rmd-avatar-colors"]).map(name => (
        <Avatar color={name} key={name}>
          {name.substring(0, 1).toUpperCase()}
        </Avatar>
      ))}
    </div>
  </TextContainer>
);

export default AvatarDemo;
