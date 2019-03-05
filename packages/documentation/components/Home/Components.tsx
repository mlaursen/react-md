import React, { FunctionComponent } from "react";

import { Code, CodeBlock } from "components/Code";

import Card from "./Card";
import CardFooter from "./CardFooter";
import CardText from "./CardText";
import { Component as SVG } from "./components.svg";

const Components: FunctionComponent = () => (
  <Card title="Components and Styles">
    <SVG className="home__card-svg" />
    <CardText>
      Once you've installed <Code>react-md</Code>, it's time to check out all
      the components that are available and how to use them.
    </CardText>
    <CodeBlock className="home__card-text" language="typescript">
      {`<Button id="example-button" onClick={() => console.log("I was clicked!")}>
  Example Button
</Button>`}
    </CodeBlock>
    <CardFooter href="/packages/app-bar">See Examples!</CardFooter>
  </Card>
);

export default Components;
