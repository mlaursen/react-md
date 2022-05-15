export const COMMIT_SHA = process.env.NEXT_PUBLIC_COMMIT_SHA || "main";
export const RMD_VERSION = process.env.NEXT_PUBLIC_RMD_VERSION || "latest"; // Ok.. it isn't really github, but don't know a better place for it
export const GA_CODE = process.env.NEXT_PUBLIC_GA_CODE || "";

export const GITHUB_URL = "https://github.com/mlaursen/react-md";
export const GITHUB_FILE_URL = `${GITHUB_URL}/blob/${COMMIT_SHA}`;
export const GITHUB_DOC_PREFIX = `${GITHUB_FILE_URL}/packages/documentation`;
export const GITHUB_DEMO_URL = `${GITHUB_DOC_PREFIX}/src/components/Demos`;
