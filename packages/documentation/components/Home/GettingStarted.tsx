import React, { FunctionComponent } from "react";
import { Code } from "components/Code";

import Card from "./Card";
import CardFooter from "./CardFooter";
import CardText from "./CardText";
import { Component as SVG } from "./getting-started.svg";

const GettingStarted: FunctionComponent = () => (
  <Card title="Getting Started">
    <SVG className="home__card-svg" />
    <CardText>
      To get started, you must first install <Code>react-md</Code>. Next, you
      should include the <Code>Roboto</Code> font and optionally{" "}
      <Code>material-icons</Code> if using font icons. Check out the full
      installation page for more info about updating existing applications,{" "}
      <Code>create-react-app</Code>, or <Code>next.js</Code>
    </CardText>
    <CardFooter href="/getting-started/quick-start">Get started!</CardFooter>
  </Card>
);

export default GettingStarted;
