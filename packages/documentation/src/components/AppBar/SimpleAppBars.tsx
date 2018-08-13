import * as React from "react";
import { MenuSVGIcon } from "@react-md/material-icons";
import { AppBar, NavigationButton } from "@react-md/app-bar";
import { Text } from "@react-md/typography";

const SimpleAppBars = () => (
  <React.Fragment>
    <AppBar className="example-group__example">
      <NavigationButton>
        <MenuSVGIcon />
      </NavigationButton>
      <Text type="headline-6">Page title</Text>
    </AppBar>
  </React.Fragment>
);

export default SimpleAppBars;
