/** @jest-environment node */
import { renderToStaticMarkup } from "react-dom/server";

import type { AppSize } from "../AppSizeProvider";
import { AppSizeProvider, useAppSize } from "../AppSizeProvider";

describe("AppSizeProvider.node", () => {
  it("should use the ssr size in node environments", () => {
    const ssrSize: AppSize = {
      isDesktop: false,
      isLandscape: false,
      isLargeDesktop: false,
      isPhone: true,
      isTablet: false,
    };

    let appSize: Readonly<AppSize> | undefined;
    function Test() {
      appSize = useAppSize();
      return null;
    }

    renderToStaticMarkup(
      <AppSizeProvider ssrSize={ssrSize}>
        <Test />
      </AppSizeProvider>
    );
    expect(appSize).toEqual({
      isDesktop: false,
      isLandscape: false,
      isLargeDesktop: false,
      isPhone: true,
      isTablet: false,
    });
  });
});
