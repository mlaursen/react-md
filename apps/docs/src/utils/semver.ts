export interface SemVer {
  major: number;
  minor: number;
  patch: number;
  alpha: number | null;
}

export function semver(version: string): SemVer {
  const [majorMinorPatch, alphaVersion] = version.split("-");
  const [major, minor, patch] = majorMinorPatch.split(".");
  const alpha = alphaVersion?.substring(alphaVersion.indexOf(".") + 1);

  return {
    major: parseInt(major, 10),
    minor: parseInt(minor, 10),
    patch: parseInt(patch, 10),
    alpha: alpha ? parseInt(alpha, 10) : null,
  };
}
