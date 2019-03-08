import React, { FunctionComponent } from "react";
import Container from "./Container";
import { Button } from "@react-md/button";

const OutlinedButtons: FunctionComponent = () => (
  <Container>
    <Button id="outlined-button-1" themeType="outline">
      Outlined Button 1
    </Button>
    <Button id="outlined-button-2" theme="secondary" themeType="outline">
      Outlined Button 2
    </Button>
    <Button id="outlined-button-3" theme="warning" themeType="outline">
      Outlined Button 3
    </Button>
    <Button id="outlined-button-4" theme="error" themeType="outline">
      Outlined Button 4
    </Button>
    <Button id="outlined-button-5" theme="clear" themeType="outline">
      Outlined Button 5
    </Button>
    <Button id="outlined-button-6" themeType="outline" disabled>
      Disabled Outlined Button
    </Button>
  </Container>
);

export default OutlinedButtons;
