import React, { FC } from "react";
import { Button } from "@react-md/button";

import Container from "./Container";

const TextButtons: FC = () => (
  <Container>
    <Button id="text-button-1" theme="primary">
      Text Button 1
    </Button>
    <Button id="text-button-2" theme="secondary">
      Text Button 2
    </Button>
    <Button id="text-button-3" theme="warning">
      Text Button 3
    </Button>
    <Button id="text-button-4" theme="error">
      Text Button 4
    </Button>
    <Button id="text-button-5" theme="clear">
      Text Button 5
    </Button>
    <Button id="text-button-6" disabled>
      Disabled Text Button
    </Button>
  </Container>
);

export default TextButtons;
