export interface FakeScssModule {
  css: string;
  scss: string;
  baseName: string;
  fileName: string;
}

export function getFakeScssModuleClassName(
  fileName: string,
  key: string
): string {
  const prefix = `${fileName}_${key}`;
  const hash = btoa(prefix).substring(0, 5);
  return `${prefix}__${hash}`;
}

export function createFakeScssModules(
  fileName: string
): Record<string, string> {
  return new Proxy(
    {},
    {
      get(_target, key) {
        if (key === "__esModule") {
          return false;
        }

        if (typeof key === "string") {
          return getFakeScssModuleClassName(fileName, key);
        }

        return "";
      },
    }
  );
}
