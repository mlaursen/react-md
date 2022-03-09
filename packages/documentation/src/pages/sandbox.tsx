import type { NextFC } from "next";
import type { IFiles } from "codesandbox-import-utils/lib/api/define";

import { getDefaultCodePreference } from "components/CodePreference";
import DemoSandbox from "components/DemoSandbox";
import { getDefaultTheme } from "components/Theme";
import { getSandboxByQuery } from "utils/getSandbox";

interface SandboxProps {
  sandbox: IFiles | null;
}

const Sandbox: NextFC<SandboxProps> = ({ sandbox }) => (
  <DemoSandbox key={`${!!sandbox}`} sandbox={sandbox} />
);

Sandbox.getInitialProps = async ({ query, req }): Promise<SandboxProps> => {
  const { pkg, name } = query;
  const sandbox = await getSandboxByQuery({
    js: getDefaultCodePreference(req?.cookies) === "js",
    pkg,
    name,
    theme: getDefaultTheme(req?.cookies),
  });

  return { sandbox };
};

export default Sandbox;
