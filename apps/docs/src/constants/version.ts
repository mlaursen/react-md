import { semver } from "@/utils/semver.js";

import { BRANCH_NAME, RMD_VERSION } from "./env.js";

export const {
  major: MAJOR_VERSION,
  minor: MINOR_VERSION,
  patch: PATCH_VERSION,
  alpha: ALPHA_VERSION,
} = semver(RMD_VERSION);

export const IS_ALPHA_PREVIEW =
  ALPHA_VERSION !== null && BRANCH_NAME !== "main";
export const IS_MAJOR_PREVIEW =
  MINOR_VERSION === 0 && PATCH_VERSION === 0 && IS_ALPHA_PREVIEW;
