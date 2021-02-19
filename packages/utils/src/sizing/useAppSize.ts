import { createContext, useContext } from "react";

import { AppSize, DEFAULT_APP_SIZE } from "./useAppSizeMedia";

/**
 * @internal
 */
export const AppSizeContext = createContext<
  AppSize & { __initialized: boolean }
>({
  ...DEFAULT_APP_SIZE,
  __initialized: false,
});

/**
 * Gets the current app size.
 *
 * @returns the current AppSize
 */
export function useAppSize(): AppSize {
  const { __initialized, ...context } = useContext(AppSizeContext);
  if (!__initialized) {
    throw new Error(
      "Unable to get the current `AppSize` from `react-md` because the `AppSizeListener` " +
        "could not be found when using the `useAppSize` hook. To fix this error, either " +
        "initialize the `AppSizeListener` component from `@react-md/utils` or the " +
        "`Configuration` component from `@react-md/layout` near the root of your app."
    );
  }

  return context;
}
