import React, { FunctionComponent, Fragment } from "react";
import { Button } from "@react-md/button";
import { Divider } from "@react-md/divider";
import { TextIconSpacing } from "@react-md/icon";
import { Text } from "@react-md/typography";
import { HomeSVGIcon, CloseSVGIcon } from "@react-md/material-icons";

import "./icon-spacing.scss";

const CustomIcon = () => <HomeSVGIcon />;

const IconSpacing: FunctionComponent = () => (
  <Fragment>
    <Text type="headline-5">Within buttons</Text>
    <Button id="icon-button-1" className="icon-spacing-button">
      <TextIconSpacing icon={<HomeSVGIcon />}>Button</TextIconSpacing>
    </Button>
    <Button
      id="icon-button-2"
      className="icon-spacing-button"
      themeType="outline"
      theme="secondary"
    >
      <TextIconSpacing icon={<HomeSVGIcon />} iconAfter>
        Button
      </TextIconSpacing>
    </Button>
    <Button
      id="icon-button-3"
      className="icon-spacing-button"
      themeType="contained"
      theme="warning"
    >
      <TextIconSpacing icon={<HomeSVGIcon />}>
        <TextIconSpacing icon={<CloseSVGIcon />} iconAfter>
          Multiple
        </TextIconSpacing>
      </TextIconSpacing>
    </Button>
    <Text type="headline-5">Normal usage</Text>
    <ul className="icon-spacing-container">
      <li>
        <TextIconSpacing icon={<HomeSVGIcon />}>Icon Before</TextIconSpacing>
      </li>
      <li>
        <TextIconSpacing icon={<HomeSVGIcon />} iconAfter>
          Icon After
        </TextIconSpacing>
      </li>
      <li>
        <TextIconSpacing icon={<HomeSVGIcon />}>
          <TextIconSpacing icon={<CloseSVGIcon />} iconAfter>
            Multiple
          </TextIconSpacing>
        </TextIconSpacing>
      </li>
      <Divider />
      <li>
        <TextIconSpacing icon={<CustomIcon />}>
          Broken Custom Icon
        </TextIconSpacing>
      </li>
      <li>
        <TextIconSpacing icon={<CustomIcon />} forceIconWrap>
          Fixed Custom Icon
        </TextIconSpacing>
      </li>
      <li>
        <TextIconSpacing icon="*" forceIconWrap>
          Using an asterisk "icon"
        </TextIconSpacing>
      </li>
      <li>
        <TextIconSpacing icon="*" forceIconWrap iconAfter>
          Using an asterisk "icon"
        </TextIconSpacing>
      </li>
    </ul>
  </Fragment>
);

export default IconSpacing;
