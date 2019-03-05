import React, { FunctionComponent } from "react";
import { Text, TextContainer } from "@react-md/typography";

import Link from "components/Link";
import { Code } from "components/Code";

const Goals: FunctionComponent = () => (
  <TextContainer>
    <Text type="headline-6" component="p">
      This project's goal is to create extremely customizable and fully
      accessible React components matching the guidelines from{" "}
      <Link href="https://www.w3.org">www.w3.org</Link> along with following
      Google's <Link href="https://material.io/design/">Material Design</Link>{" "}
      principles.
    </Text>
    <Text type="headline-6" component="p">
      Unlike other component libraries, this project will be utilizing SCSS
      along with CSS Variables instead of a CSS-in-JS solution. The dynamic
      themes and style customization can be done with the provided{" "}
      <Code>rmd-theme</Code> mixins or pre-compile time by overriding the
      default variables.
    </Text>
  </TextContainer>
);

export default Goals;
