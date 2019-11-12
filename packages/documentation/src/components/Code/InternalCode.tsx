import React, { FC, Fragment } from "react";

import GoogleFont from "components/GoogleFont";

import Code, { CodeProps } from "./Code";

const InternalCode: FC<CodeProps> = props => (
  <Fragment>
    <GoogleFont font="Source Code Pro" />
    <Code {...props} />
  </Fragment>
);

export default InternalCode;
