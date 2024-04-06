export function getFakeCssModuleClassName(
  fileName: string,
  key: string
): string {
  const prefix = `${fileName}_${key}`;
  const hash = btoa(prefix).substring(0, 5);
  return `${prefix}__${hash}`;
}

export function createFakeCssModules(fileName: string): Record<string, string> {
  return new Proxy(
    {},
    {
      get(_target, key) {
        if (key === "__esModule") {
          return false;
        }

        if (typeof key === "string") {
          return getFakeCssModuleClassName(fileName, key);
        }

        return "";
      },
    }
  );
}
