import React, { FunctionComponent } from "react";

import { Code } from "components/Code";

import Card from "./Card";
import CardFooter from "./CardFooter";
import CardText from "./CardText";
import { Component as SVG } from "./customization.svg";

const Customization: FunctionComponent = () => (
  <Card title="Customization and Themes">
    <SVG className="home__card-svg" />
    <CardText>
      Now that you've gotten the hang of using components from{" "}
      <Code>react-md</Code>, it's time to make your app feel unique! There's no
      point in having every app look exactly the same especially when you need
      to add your company's branding.
    </CardText>
    <CardFooter href="/customization/color-palette">Customize!</CardFooter>
  </Card>
);

export default Customization;
