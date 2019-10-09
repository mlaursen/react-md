import React from "react";
import { NextComponentType, NextPageContext } from "next";
import { IFiles } from "codesandbox-import-utils/lib/api/define";

import { getSandboxByQuery } from "utils/getSandbox";
import DemoSandbox from "components/DemoSandbox";

interface SandboxProps {
  sandbox: IFiles | null;
}

const Sandbox: NextComponentType<
  NextPageContext,
  SandboxProps,
  SandboxProps
> = ({ sandbox }) => <DemoSandbox sandbox={sandbox} />;

Sandbox.getInitialProps = async ({ query }): Promise<SandboxProps> => {
  const sandbox = await getSandboxByQuery(query);

  return { sandbox };
};

export default Sandbox;
