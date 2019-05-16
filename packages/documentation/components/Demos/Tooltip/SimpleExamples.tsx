import React, { Fragment, FunctionComponent } from "react";
import { Button } from "@react-md/button";
import { Tooltipped } from "@react-md/tooltip";

import "./simple-examples.scss";

const SimpleExamples: FunctionComponent = () => {
  return (
    <Fragment>
      <Tooltipped id="button-1">
        <Button title="Button">Hello</Button>
      </Tooltipped>
      <Tooltipped
        id="button-2"
        tooltip="This is a tooltip that is way to big for the viewport and should automatically line-wrap!"
        className="short-tooltip"
      >
        <Button>Hello</Button>
      </Tooltipped>
      <Tooltipped
        id="button3"
        tooltip={
          <span style={{ color: "red" }}>
            This is a tooltip that is way too big for the viewport and should
            automatically line-wrap !
          </span>
        }
      >
        <span style={{ display: "inline-flex" }}>Yeah buddy</span>
      </Tooltipped>
    </Fragment>
  );
};

export default SimpleExamples;
