import React, { FC } from "react";
import { Button } from "@react-md/button";

import Container from "./Container";

const OutlinedButtons: FC = () => (
  <Container>
    <Button id="outlined-button-1" theme="primary" themeType="outline">
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
