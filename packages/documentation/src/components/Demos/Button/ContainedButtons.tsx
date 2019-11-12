import React, { FC } from "react";
import { Button } from "@react-md/button";

import Container from "./Container";

const ContainedButtons: FC = () => (
  <Container>
    <Button id="contained-button-1" theme="primary" themeType="contained">
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
