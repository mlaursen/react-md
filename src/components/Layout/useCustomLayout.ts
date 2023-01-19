import type {
  SupportedPhoneLayout,
  SupportedTabletLayout,
  SupportedWideLayout,
  UseStateObject,
} from "@react-md/core";
import { useLocalStorage } from "@react-md/core";

export type CustomLayout = UseStateObject<"phoneLayout", SupportedPhoneLayout> &
  UseStateObject<"tabletLayout", SupportedTabletLayout> &
  UseStateObject<"desktopLayout", SupportedWideLayout> &
  UseStateObject<"largeDesktopLayout", SupportedWideLayout> &
  UseStateObject<"landscapeTabletLayout", SupportedTabletLayout>;

/**
 * Note: I'd like to be able to say that large layouts are toggleable by
 * default, but it appears to cause SSR issues that way on mobile
 */
export function useCustomLayout(): CustomLayout {
  const { value: phoneLayout, setValue: setPhoneLayout } =
    useLocalStorage<SupportedPhoneLayout>({
      key: "phoneLayout",
      defaultValue: "temporary",
    });
  const { value: tabletLayout, setValue: setTabletLayout } =
    useLocalStorage<SupportedTabletLayout>({
      key: "tabletLayout",
      defaultValue: "temporary",
    });
  const { value: desktopLayout, setValue: setDesktopLayout } =
    useLocalStorage<SupportedWideLayout>({
      key: "desktopLayout",
      defaultValue: "temporary",
    });
  const { value: largeDesktopLayout, setValue: setLargeDesktopLayout } =
    useLocalStorage<SupportedWideLayout>({
      key: "largeDesktopLayout",
      defaultValue: "temporary",
    });
  const { value: landscapeTabletLayout, setValue: setLandscapeTabletLayout } =
    useLocalStorage<SupportedTabletLayout>({
      key: "landscapeTabletLayout",
      defaultValue: "temporary",
    });

  return {
    phoneLayout,
    setPhoneLayout,
    tabletLayout,
    setTabletLayout,
    desktopLayout,
    setDesktopLayout,
    largeDesktopLayout,
    setLargeDesktopLayout,
    landscapeTabletLayout,
    setLandscapeTabletLayout,
  };
}
