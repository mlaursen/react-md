import { type MaterialSymbolsGoogleFontUrlOptions } from "@react-md/core/icon/getMaterialSymbolsUrl";
import { type MaterialSymbolName } from "@react-md/core/icon/material";

export interface MaterialSymbolPluginOptions extends MaterialSymbolsGoogleFontUrlOptions {
  /**
   * An optional list of material symbol names to include when the simple regex
   * matcher does not work. For example, if you have a custom component that
   * dynamically sets the `name` for the `MaterialSymbol` use this option for
   * known values since the regex will be unable to determine the used symbol
   * names.
   */
  defaultSymbolNames?: readonly MaterialSymbolName[];

  /**
   * Use this prop to prevent the google fonts preconnect links from being included
   * in the default html.
   *
   * @defaultValue `false`
   */
  disablePreconnectLinks?: boolean;

  /**
   * The pattern to use to find files referencing material symbols.
   *
   * @defaultValue `"src\/**\/*.{ts,tsx,js,jsx}"`
   */
  pattern?: string;
}
