import qs from "qs";
import type { ParsedUrlQuery } from "querystring";

type QueryParam = string | string[] | undefined;

export const qsToString = (q: QueryParam): string => {
  if (!q) {
    return "";
  }

  if (Array.isArray(q)) {
    return q[0] || "";
  }

  return q;
};

export const qsToInt = (q: QueryParam, fallback = 0): number => {
  const value = qsToString(q);
  const asNumber = parseInt(value, 10);

  return Number.isNaN(asNumber) ? fallback : asNumber;
};

export const qsToBoolean = (q: QueryParam): boolean => typeof q !== "undefined";

export function getCompletePathname(
  pathname: string,
  query: ParsedUrlQuery
): string {
  return Object.entries(query).reduce(
    (updated, [key, value]) => updated.replace(`[${key}]`, qsToString(value)),
    pathname
  );
}

export interface SandboxParams {
  pkg: string;
  name: string;
  from: string;
  fileName: string;
}

interface SandboxQueryParams {
  pkg: string;
  name: string;
  from: string;
  fileName: string;
}

export type SandboxQuery = Partial<SandboxQueryParams>;

export function parseSandbox(query: SandboxQuery, js: boolean): SandboxParams {
  query = query || {};
  const pkg = qsToString(query.pkg);
  const name = qsToString(query.name);
  const from = qsToString(query.from);
  let fileName = qsToString(query.fileName) || "src/Demo.tsx";
  if (js) {
    fileName = fileName.replace(/\.t(sx?)$/, ".j$1");
  }

  return {
    pkg,
    name,
    from,
    fileName,
  };
}

type SandboxOptions = Pick<SandboxParams, "pkg" | "name" | "from">;

export function toSandbox({ pkg, name, from }: SandboxOptions): string {
  return `/sandbox?${qs.stringify({ pkg, name, from })}`;
}
