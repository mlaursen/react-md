import { createContext, useContext } from "react";
import { AppSize, DEFAULT_APP_SIZE } from "./useAppSizeMedia";

/**
 * @private
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
 * @return the current AppSize
 */
export default function useAppSize(): AppSize {
  const { __initialized, ...context } = useContext(AppSizeContext);
  if (!__initialized) {
    throw new Error(
      "Attempted to use the current `AppSizeContext` without mounting the `AppSizeListener` component beforehand."
    );
  }

  return context;
}
