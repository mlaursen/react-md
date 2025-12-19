export interface SemVer {
  major: number;
  minor: number;
  patch: number;
  alpha: number | null;
}

export function semver(version: string): SemVer {
  const [majorMinorPatch, alphaVersion] = version.split("-");
  const [major, minor, patch] = majorMinorPatch.split(".");
  const alpha = alphaVersion?.slice(Math.max(0, alphaVersion.indexOf(".") + 1));

  return {
    major: Number.parseInt(major, 10),
    minor: Number.parseInt(minor, 10),
    patch: Number.parseInt(patch, 10),
    alpha: alpha ? Number.parseInt(alpha, 10) : null,
  };
}
