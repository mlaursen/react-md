import React, { Component, PureComponent, FunctionComponent } from "react";
import { TextContainer, Text } from "@react-md/typography";
import { First, Second, FirstJSX, SecondJSX } from "./DemoWOJsx";

export default class Demo extends Component {
  public render() {
    return (
      <TextContainer>
        <Text type="headline-1">Demo!</Text>
        <Text type="headline-2">Let's dig into:</Text>
        <Text type="headline-3">
          <code className="code">src/slides/Demo/Demo.tsx</code>
        </Text>
        {/*<div className="output">
          <First />
          <Second />
          <FirstJSX />
          <SecondJSX />
        </div>*/}
      </TextContainer>
    );
  }
}
