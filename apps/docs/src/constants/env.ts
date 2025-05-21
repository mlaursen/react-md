/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // created by createEnv script
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_GITHUB_URL: string;
      NEXT_PUBLIC_GITHUB_FILE_LINK: string;
      NEXT_PUBLIC_RMD_VERSION: string;
      NEXT_PUBLIC_BRANCH_NAME: string;
      NEXT_PUBLIC_GTAG_ID?: string;

      NEXT_PUBLIC_ALGOLIA_APP_ID: string;
      NEXT_PUBLIC_ALGOLIA_API_KEY: string;
      NEXT_PUBLIC_ALGOLIA_INDEX_NAME: string;

      // https://vercel.com/docs/projects/environment-variables/system-environment-variables#framework-environment-variables
      NEXT_PUBLIC_VERCEL_ENV?: "production" | "preview" | "development";
      NEXT_PUBLIC_VERCEL_URL?: string;
      NEXT_PUBLIC_VERCEL_BRANCH_URL?: string;
      NEXT_PUBLIC_VERCEL_GIT_PROVIDER?: string;
      NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG?: string;
      NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER?: string;
      NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF?: string;
      NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?: string;
      NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE?: string;
      NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN?: string;
      NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME?: string;
      NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID?: string;
    }
  }
}

export const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;
export const GITHUB_LINK_URL = process.env.NEXT_PUBLIC_GITHUB_FILE_LINK;
export const BRANCH_NAME = process.env.NEXT_PUBLIC_BRANCH_NAME;
export const RMD_VERSION = process.env.NEXT_PUBLIC_RMD_VERSION;
export const DEPLOYMENT_ENV =
  process.env.NEXT_PUBLIC_VERCEL_ENV || "development";
export const IS_PRODUCTION_ENV = DEPLOYMENT_ENV === "production";

export const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
export const ALGOLIA_API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;
export const ALGOLIA_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;
