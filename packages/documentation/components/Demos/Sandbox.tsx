import React, { Fragment, FunctionComponent } from "react";
import { AppBarAction } from "@react-md/app-bar";
import { Portal } from "@react-md/portal";
import { Omit, useToggle } from "@react-md/utils";

import CodeSandboxSVGIcon from "icons/CodeSandboxSVGIcon";

import SandboxDefineForm, { SandboxDefineFormProps } from "./SandboxDefineForm";

export interface SandboxProps
  extends Omit<SandboxDefineFormProps, "onCreated"> {
  id: string;
}

const Sandbox: FunctionComponent<SandboxProps> = ({ id, getSandbox }) => {
  const { toggled: loading, enable, disable } = useToggle();

  return (
    <Fragment>
      <Portal>
        {loading && (
          <SandboxDefineForm getSandbox={getSandbox} onCreated={disable} />
        )}
      </Portal>
      <AppBarAction id={id} onClick={enable} disabled={loading}>
        <CodeSandboxSVGIcon />
      </AppBarAction>
    </Fragment>
  );
};

export default Sandbox;
