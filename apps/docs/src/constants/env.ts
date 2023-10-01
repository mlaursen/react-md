/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_GITHUB_URL: string;

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

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

const COMMIT_REF = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF;
const COMMIT_SHA = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
const ref = COMMIT_SHA || COMMIT_REF || "next";

export const GITHUB_LINK_URL = `${GITHUB_URL}/blob/${ref}`;
