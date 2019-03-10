import { useMemo, useState, useEffect } from "react";

type QuerySize = number | string;

export const DEFAULT_DESKTOP_MIN_WIDTH = `${1025 / 16}rem`;
export const DEFAULT_TABLET_MIN_WIDTH = `${768 / 16}rem`;
export const DEFAULT_TABLET_MAX_WIDTH = `${1024 / 16}rem`;
export const DEFAULT_PHONE_MAX_WIDTH = `${767 / 16}rem`;

const toWidthPart = (v: QuerySize | undefined, prefix: "min" | "max") => {
  const type = typeof v;
  if (type === "undefined") {
    return "";
  }

  v = type === "number" ? `${v}px` : v;
  return `(${prefix}-width: ${v})`;
};

interface WidthMediaQuery {
  min?: QuerySize;
  max?: QuerySize;
}

type WidthMediaQuerys =
  | { min: QuerySize }
  | { max: QuerySize }
  | { min: QuerySize; max: QuerySize };

export function useWidthMediaQuery({
  min,
  max,
}: WidthMediaQuery & WidthMediaQuerys) {
  const query = useMemo(
    () =>
      `screen and ${[toWidthPart(min, "min"), toWidthPart(max, "max")]
        .filter(Boolean)
        .join(" and ")}`,
    [min, max]
  );

  return useMediaQuery(query);
}

export function useMediaQuery(
  query: string,
  defaultValue?: boolean,
  checkImmediately: boolean = typeof window !== "undefined"
) {
  const [matches, setMatches] = useState(() => {
    if (typeof defaultValue !== "undefined") {
      return defaultValue;
    } else if (checkImmediately && typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }

    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mq = window.matchMedia(query);
    const updater = ({ matches }: MediaQueryListEvent) => setMatches(matches);
    mq.addListener(updater);

    if (mq.matches !== matches) {
      setMatches(mq.matches);
    }

    return () => mq.removeListener(updater);
  }, []);

  return matches;
}

export function useOrientation(defaultValue?: OrientationType) {
  const [value, setValue] = useState<OrientationType>(() => {
    if (defaultValue) {
      return defaultValue;
    } else if (typeof window !== "undefined") {
      return window.screen.orientation.type;
    }

    return "landscape-primary";
  });

  useEffect(() => {
    const handler = () => {
      setValue(window.screen.orientation.type);
    };
    window.addEventListener("orientationchange", handler);

    return () => window.removeEventListener("orientationchange", handler);
  }, []);

  return value;
}

interface AppSizeOptions {
  phoneMaxWidth?: QuerySize;
  tabletMinWidth?: QuerySize;
  tabletMaxWidth?: QuerySize;
  desktopMinWidth?: QuerySize;
  defaultValue?: AppSize;
}

export interface AppSize {
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPortraitPhone: boolean;
  isLandscapePhone: boolean;
  isPortraitTablet: boolean;
  isLandscapeTablet: boolean;
}

const DEFAULT_APP_SIZE = {
  isPhone: false,
  isTablet: false,
  isDesktop: true,
  isPortraitPhone: false,
  isLandscapePhone: false,
  isPortraitTablet: false,
  isLandscapeTablet: false,
};

export function useAppSize({
  phoneMaxWidth = DEFAULT_PHONE_MAX_WIDTH,
  tabletMinWidth = DEFAULT_TABLET_MIN_WIDTH,
  tabletMaxWidth = DEFAULT_TABLET_MAX_WIDTH,
  desktopMinWidth = DEFAULT_DESKTOP_MIN_WIDTH,
  defaultValue = DEFAULT_APP_SIZE,
}: AppSizeOptions = {}): AppSize {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  const matchesDesktop = useWidthMediaQuery({ min: desktopMinWidth });
  const matchesTablet = useWidthMediaQuery({
    min: tabletMinWidth,
    max: tabletMaxWidth,
  });
  const matchesPhone = useWidthMediaQuery({ max: phoneMaxWidth });
  const orientation = useOrientation();
  const isPortrait =
    orientation === "portrait-primary" || orientation === "portrait-secondary";
  const isDesktop = matchesDesktop;
  const isTablet = !matchesDesktop && matchesTablet;
  const isPhone = !isTablet && !isDesktop && matchesPhone;

  return {
    isPhone,
    isTablet,
    isDesktop,
    isPortraitPhone: isPhone && isPortrait,
    isLandscapePhone: isPhone && !isPortrait,
    isPortraitTablet: isTablet && isPortrait,
    isLandscapeTablet: isTablet && !isPortrait,
  };
}
