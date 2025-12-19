import {
  type AppSizeQueries,
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_PHONE_MAX_WIDTH,
  DEFAULT_TABLET_MAX_WIDTH,
  DEFAULT_TABLET_MIN_WIDTH,
} from "./appSize.js";

/** @since 6.4.0 */
export type MediaQueryConfig = Required<AppSizeQueries>;

/**
 * @since 6.4.0
 */
export const MEDIA_QUERY_CONFIG: MediaQueryConfig = {
  phoneMaxWidth: DEFAULT_PHONE_MAX_WIDTH,
  tabletMinWidth: DEFAULT_TABLET_MIN_WIDTH,
  tabletMaxWidth: DEFAULT_TABLET_MAX_WIDTH,
  desktopMinWidth: DEFAULT_DESKTOP_MIN_WIDTH,
  desktopLargeMinWidth: DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
};

/**
 * @since 6.4.0
 */
export function configureMediaQueries(
  queries: Readonly<Partial<MediaQueryConfig>>
): void {
  if (process.env.NODE_ENV !== "production") {
    for (const [name, value] of Object.entries(queries)) {
      if (!(name in MEDIA_QUERY_CONFIG)) {
        throw new Error(`${name} is an invalid react-md media query.`);
      }

      MEDIA_QUERY_CONFIG[name as keyof MediaQueryConfig] = value;
    }
  } else {
    Object.assign(MEDIA_QUERY_CONFIG, queries);
  }
}
