import React, { Fragment, FunctionComponent, ReactNode } from "react";
import { Text } from "@react-md/typography";

import AsyncButton, { AsyncButtonProps } from "./AsyncButton";
import Container from "./Container";
import useTemporaryToggle from "./useTemporaryToggle";

interface ExampleProps extends Pick<AsyncButtonProps, "id" | "asyncType"> {
  children: ReactNode;
}

const Example: FunctionComponent<ExampleProps> = ({ children, ...props }) => {
  const { toggled, toggle } = useTemporaryToggle();

  return (
    <Container>
      <Text type="headline-6" margin="none">
        {children}
      </Text>
      <AsyncButton {...props} onClick={toggle} loading={toggled} />
      <AsyncButton
        {...props}
        themeType="outline"
        onClick={toggle}
        loading={toggled}
      />
      <AsyncButton
        {...props}
        themeType="contained"
        onClick={toggle}
        loading={toggled}
      />
    </Container>
  );
};

const WithinButtons: FunctionComponent = () => (
  <Fragment>
    <Example id="async-button-1" asyncType="icon-before">
      Circular Before
    </Example>
    <Example id="async-button-2" asyncType="icon-after">
      Circular After
    </Example>
    <Example id="async-button-3" asyncType="circular-overlay">
      Circular Overlay
    </Example>
    <Example id="async-button-4" asyncType="linear-overlay">
      Linear Overlay
    </Example>
  </Fragment>
);

export default WithinButtons;
