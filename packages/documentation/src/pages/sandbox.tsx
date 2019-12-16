import React from "react";
import { NextFC } from "next";
import { IFiles } from "codesandbox-import-utils/lib/api/define";

import DemoSandbox from "components/DemoSandbox";
import { getSandboxByQuery } from "utils/getSandbox";

interface SandboxProps {
  sandbox: IFiles | null;
}

const Sandbox: NextFC<SandboxProps> = ({ sandbox }) => (
  <DemoSandbox sandbox={sandbox} />
);

Sandbox.getInitialProps = async ({ query }): Promise<SandboxProps> => {
  const sandbox = await getSandboxByQuery(query);

  return { sandbox };
};

export default Sandbox;
