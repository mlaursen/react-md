import React, { FunctionComponent } from "react";
import Container from "./Container";
import { Button } from "@react-md/button";

const ContainedButtons: FunctionComponent = () => (
  <Container>
    <Button id="contained-button-1" themeType="contained">
      Contained Button 1
    </Button>
    <Button id="contained-button-2" theme="secondary" themeType="contained">
      Contained Button 2
    </Button>
    <Button id="contained-button-3" theme="warning" themeType="contained">
      Contained Button 3
    </Button>
    <Button id="contained-button-4" theme="error" themeType="contained">
      Contained Button 4
    </Button>
    <Button id="contained-button-5" theme="clear" themeType="contained">
      Contained Button 5
    </Button>
    <Button id="contained-button-6" themeType="contained" disabled>
      Disabled Contained Button
    </Button>
  </Container>
);

export default ContainedButtons;
