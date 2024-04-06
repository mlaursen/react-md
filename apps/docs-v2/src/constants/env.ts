/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // created by createEnv script
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_GITHUB_URL: string;
      NEXT_PUBLIC_GITHUB_FILE_LINK: string;
      NEXT_PUBLIC_RMD_VERSION: string;

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
export const GITHUB_LINK_URL = process.env.NEXT_PUBLIC_GITHUB_FILE_LINK;
