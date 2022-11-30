import type { UseStateObject } from "@react-md/core";
import { useLocalStorage } from "@react-md/core";
import type {
  SupportedPhoneLayout,
  SupportedTabletLayout,
  SupportedWideLayout,
} from "@react-md/layout";

export type CustomLayout = UseStateObject<"phoneLayout", SupportedPhoneLayout> &
  UseStateObject<"tabletLayout", SupportedTabletLayout> &
  UseStateObject<"desktopLayout", SupportedWideLayout> &
  UseStateObject<"largeDesktopLayout", SupportedWideLayout> &
  UseStateObject<"landscapeTabletLayout", SupportedTabletLayout>;

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