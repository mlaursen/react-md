export const { COMMIT_SHA = "master" } = process.env;
export const { RMD_VERSION = "latest" } = process.env; // Ok.. it isn't really github, but don't know a better place for it

export const GITHUB_URL = "https://github.com/mlaursen/react-md";
export const GITHUB_FILE_URL = `${GITHUB_URL}/blob/${COMMIT_SHA}`;
export const GITHUB_DOC_PREFIX = `${GITHUB_FILE_URL}/packages/documentation`;
export const GITHUB_DEMO_URL = `${GITHUB_DOC_PREFIX}/src/components/Demos`;
