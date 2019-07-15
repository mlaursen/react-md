import React, { Fragment, FC } from "react";
import { Portal } from "@react-md/portal";
import { useToggle } from "@react-md/utils";

import AppBarAction from "components/AppBarAction";
import CodeSandboxSVGIcon from "icons/CodeSandboxSVGIcon";

import SandboxDefineForm from "./SandboxDefineForm";
import { IFiles } from "codesandbox-import-utils/lib/api/define";

export interface SandboxProps {
  id: string;
  getSandbox: null | (() => Promise<IFiles>);
}

const Sandbox: FC<SandboxProps> = ({ id, getSandbox }) => {
  const [loading, enable, disable] = useToggle(false);
  if (!getSandbox) {
    return null;
  }

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
