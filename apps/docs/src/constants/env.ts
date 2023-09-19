/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_GITHUB_URL: string;
    }
  }
}

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;
