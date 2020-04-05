import React, { FC } from "react";

import GoogleFont from "components/GoogleFont";

import Code, { CodeProps } from "./Code";

const InternalCode: FC<CodeProps> = (props) => (
  <>
    <GoogleFont font="Source Code Pro" />
    <Code {...props} />
  </>
);

export default InternalCode;
