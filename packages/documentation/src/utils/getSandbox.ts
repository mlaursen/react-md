import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { upperFirst } from "lodash";
import { RMD_VERSION } from "constants/github";
import sandboxes, { PackageName, GetSandbox } from "constants/sandboxes";
import { versions } from "constants/versions";
import { ThemeMode } from "components/Theme";

interface PackageJson {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

function getVersion(packageName: string): string {
  const name = packageName.startsWith("@")
    ? packageName
    : packageName.replace(/\/.+$/, "");

  if (name === "react-scripts") {
    return "latest";
  }

  if (name.includes("react-md")) {
    return RMD_VERSION;
  }

  const version = versions[name];
  if (!versions[name]) {
    throw new Error(`${name} does not have a version available`);
  }

  return version;
}

function updatePackageJson(content: PackageJson): void {
  Object.keys(content.dependencies).forEach((name) => {
    content.dependencies[name] = getVersion(name);
  });
  Object.keys(content.devDependencies).forEach((name) => {
    content.devDependencies[name] = getVersion(name);
  });
}

export default function getSandbox(
  packageName: string,
  demoName: string,
  theme: ThemeMode,
  js: boolean
): GetSandbox | null {
  packageName = packageName.replace(/ /g, "");
  demoName = demoName
    .replace(/-|\(\)/g, "")
    .split(" ")
    .map(upperFirst)
    .join("");
  if (js) {
    demoName = `${demoName}-js`;
  }

  const pkg = sandboxes[packageName as PackageName] || {};
  const getter = pkg[demoName];
  if (!getter) {
    return null;
  }

  return async function get(): Promise<IFiles> {
    const jsonFiles = await getter();
    const files = Object.entries(jsonFiles).reduce<IFiles>(
      (files, [fileName, data]) => {
        let { content } = data;
        if (typeof content === "string") {
          content = content
            .replace(/{{RMD_VERSION}}/g, RMD_VERSION)
            .replace(/{{THEME}}/g, theme);
          if (theme === "dark" && fileName === "src/_everything.scss") {
            content = content.replace(
              "$rmd-theme-light: true",
              "$rmd-theme-light: false"
            );
          }

          if (fileName.endsWith(".scss")) {
            content = content.replace(
              /^@(use|forward) ('|")react-md\2(.*)$/gm,
              "// Note: Outside of codesandbox, this can be `@$1 $2react-md$2$3`\n@$1 $2react-md/dist/everything$2$3"
            );
          }
        } else if (
          typeof content === "object" &&
          content &&
          !Array.isArray(content)
        ) {
          const updated = { ...(content as PackageJson) };
          updatePackageJson(updated);
        }

        files[fileName] = { ...data, content };
        return files;
      },
      {}
    );

    return files;
  };
}

interface Query {
  js: boolean;
  pkg?: string | string[];
  name?: string | string[];
  theme: ThemeMode;
}

export async function getSandboxByQuery({
  js,
  pkg,
  name,
  theme,
}: Query): Promise<IFiles | null> {
  if (!name || !pkg) {
    return null;
  }

  pkg = Array.isArray(pkg) ? pkg[0] : pkg;
  name = Array.isArray(name) ? name[0] : name;

  const loadSandbox = getSandbox(pkg || "", name || "", theme, js);
  let sandbox = null;
  if (loadSandbox) {
    sandbox = await loadSandbox();
  }

  return sandbox;
}
