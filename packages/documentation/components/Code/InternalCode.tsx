import React, { FunctionComponent, Fragment } from "react";
import Code, { CodeProps } from "./Code";
import GoogleFont from "components/GoogleFont";

const InternalCode: FunctionComponent<CodeProps> = props => (
  <Fragment>
    <GoogleFont font="Source Code Pro" />
    <Code {...props} />
  </Fragment>
);

export default InternalCode;
