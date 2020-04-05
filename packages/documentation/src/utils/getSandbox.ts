import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { upperFirst } from "lodash";
import sandboxes, { PackageName, GetSandbox } from "constants/sandboxes";

export default function getSandbox(
  packageName: string,
  demoName: string
): GetSandbox | null {
  packageName = packageName.replace(/ /g, "");
  demoName = demoName
    .replace(/-|\(\)/g, "")
    .split(" ")
    .map(upperFirst)
    .join("");

  const pkg = sandboxes[packageName as PackageName] || {};
  return pkg[demoName] || null;
}

interface Query {
  pkg?: string | string[];
  name?: string | string[];
}

export async function getSandboxByQuery({
  pkg,
  name,
}: Query = {}): Promise<IFiles | null> {
  if (!name || !pkg) {
    return null;
  }

  pkg = Array.isArray(pkg) ? pkg[0] : pkg;
  name = Array.isArray(name) ? name[0] : name;

  const loadSandbox = getSandbox(pkg || "", name || "");
  let sandbox = null;
  if (loadSandbox) {
    sandbox = await loadSandbox();
  }

  return sandbox;
}
