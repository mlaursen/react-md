import React, { ReactElement } from "react";

import GoogleFont from "components/GoogleFont";

import Code, { CodeProps } from "./Code";

export default function InternalCode(props: CodeProps): ReactElement {
  return (
    <>
      <GoogleFont font="Source Code Pro" />
      <Code {...props} />
    </>
  );
}
