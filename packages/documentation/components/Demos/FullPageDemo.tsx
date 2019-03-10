import React, { FunctionComponent, ReactNode, useState, Fragment } from "react";
import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { Text } from "@react-md/typography";
import {
  LaunchSVGIcon,
  KeyboardArrowLeftSVGIcon,
} from "@react-md/material-icons";
import { AppBar, APP_BAR_OFFSET_CLASSNAME } from "@react-md/app-bar";

import AppBarNav from "components/AppBarNav";
import "./full-page-demo.scss";

export interface FullPageDemoProps {
  id: string;
  children: ReactNode;
}

const FullPageDemo: FunctionComponent<FullPageDemoProps> = ({
  id,
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const show = () => {
    if (!visible) {
      setVisible(true);
    }
  };

  const hide = () => {
    if (visible) {
      setVisible(false);
    }
  };
  return (
    <Fragment>
      <Text type="headline-6">
        This example requires a more screen real estate than what is available
        so you will need to open it in a modal.
      </Text>
      <Button id={`${id}-toggle`} themeType="contained" onClick={show}>
        <TextIconSpacing icon={<LaunchSVGIcon />}>Launch</TextIconSpacing>
      </Button>
      {visible && (
        <div id={`${id}-modal`} role="dialog" tabIndex={-1} className="modal">
          <AppBar id={`${id}-modal-toolbar`} fixed>
            <AppBarNav
              id={`${id}-close`}
              tooltip="Close this demo"
              onClick={hide}
            >
              <KeyboardArrowLeftSVGIcon />
            </AppBarNav>
          </AppBar>
          <div className={APP_BAR_OFFSET_CLASSNAME}>{children}</div>
        </div>
      )}
    </Fragment>
  );
};

export default FullPageDemo;
