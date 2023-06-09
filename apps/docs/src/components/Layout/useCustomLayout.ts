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

const PHONE_LAYOUTS: SupportedPhoneLayout[] = ["temporary", "temporary-mini"];
const TABLET_LAYOUTS: SupportedTabletLayout[] = [
  ...PHONE_LAYOUTS,
  "toggleable",
  "toggleable-mini",
];
const WIDE_LAYOUTS: SupportedWideLayout[] = [
  ...TABLET_LAYOUTS,
  "floating",
  "clipped",
  "full-height",
];

const isPhoneLayout = (value: unknown): value is SupportedPhoneLayout =>
  PHONE_LAYOUTS.includes(value as SupportedPhoneLayout);
const isTabletLayout = (value: unknown): value is SupportedTabletLayout =>
  TABLET_LAYOUTS.includes(value as SupportedTabletLayout);
const isWideLayout = (value: unknown): value is SupportedWideLayout =>
  WIDE_LAYOUTS.includes(value as SupportedWideLayout);

/**
 * Note: I'd like to be able to say that large layouts are toggleable by
 * default, but it appears to cause SSR issues that way on mobile
 */
export function useCustomLayout(): CustomLayout {
  const { value: phoneLayout, setValue: setPhoneLayout } =
    useLocalStorage<SupportedPhoneLayout>({
      key: "phoneLayout",
      defaultValue: "temporary",
      deserializer: (item) => (isPhoneLayout(item) ? item : PHONE_LAYOUTS[0]),
    });
  const { value: tabletLayout, setValue: setTabletLayout } =
    useLocalStorage<SupportedTabletLayout>({
      key: "tabletLayout",
      defaultValue: "temporary",
      deserializer: (item) => (isTabletLayout(item) ? item : TABLET_LAYOUTS[0]),
    });
  const { value: desktopLayout, setValue: setDesktopLayout } =
    useLocalStorage<SupportedWideLayout>({
      key: "desktopLayout",
      defaultValue: "temporary",
      deserializer: (item) => (isWideLayout(item) ? item : WIDE_LAYOUTS[0]),
    });
  const { value: largeDesktopLayout, setValue: setLargeDesktopLayout } =
    useLocalStorage<SupportedWideLayout>({
      key: "largeDesktopLayout",
      defaultValue: "temporary",
      deserializer: (item) => (isWideLayout(item) ? item : WIDE_LAYOUTS[0]),
    });
  const { value: landscapeTabletLayout, setValue: setLandscapeTabletLayout } =
    useLocalStorage<SupportedTabletLayout>({
      key: "landscapeTabletLayout",
      defaultValue: "temporary",
      deserializer: (item) => (isTabletLayout(item) ? item : TABLET_LAYOUTS[0]),
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
