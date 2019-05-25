import React, { Fragment, FC } from "react";
import { Portal } from "@react-md/portal";
import { Omit, useToggle } from "@react-md/utils";

import AppBarAction from "components/AppBarAction";
import CodeSandboxSVGIcon from "icons/CodeSandboxSVGIcon";

import SandboxDefineForm, { SandboxDefineFormProps } from "./SandboxDefineForm";

export interface SandboxProps
  extends Omit<SandboxDefineFormProps, "onCreated"> {
  id: string;
}

const Sandbox: FC<SandboxProps> = ({ id, getSandbox }) => {
  const { toggled: loading, enable, disable } = useToggle();

  return (
    <Fragment>
      <Portal>
        {loading && (
          <SandboxDefineForm getSandbox={getSandbox} onCreated={disable} />
        )}
      </Portal>
      <AppBarAction
        id={id}
        aria-label="Code Sandbox"
        tooltip="Open Code Sandbox"
        onClick={enable}
        disabled={loading}
      >
        <CodeSandboxSVGIcon />
      </AppBarAction>
    </Fragment>
  );
};

export default Sandbox;
