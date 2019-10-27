import qs from "qs";

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

export interface SandboxParams {
  pkg: string;
  name: string;
  from: string;
  fileName: string;
}
export type SandboxQuery = Partial<SandboxParams>;

export function parseSandbox(query?: SandboxQuery): SandboxParams {
  query = query || {};
  const pkg = qsToString(query.pkg);
  const name = qsToString(query.name);
  const from = qsToString(query.from);
  const fileName = qsToString(query.fileName) || "src/Demo.tsx";

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
