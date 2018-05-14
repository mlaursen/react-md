import * as React from "react";
import { Text } from "@react-md/typography";
import { Theme } from "@react-md/color";

export default class ThemeExample extends React.Component<null, null> {
  public render() {
    return (
      <React.Fragment>
        <Theme primary={true} target="text">
          <Text type="body-1">
            This is a paragraphy that was themed with the primary color on text.
          </Text>
        </Theme>
      </React.Fragment>
    );
  }
}
