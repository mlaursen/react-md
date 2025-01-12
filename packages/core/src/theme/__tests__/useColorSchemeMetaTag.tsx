import { describe, expect, it } from "@jest/globals";
import { render } from "test-utils";
import {
  useColorSchemeMetaTag,
  type ColorSchemeMetaTagOptions,
} from "../useColorSchemeMetaTag.js";

const getColorSchemeMetaTag = (): HTMLMetaElement | null =>
  document.querySelector('meta[name="color-scheme"]');

function Test(props: ColorSchemeMetaTagOptions): null {
  useColorSchemeMetaTag(props);

  return null;
}

describe("useColorSchemeMetaTag", () => {
  it("should modify create and update a color-scheme meta tag for the current color scheme", () => {
    expect(getColorSchemeMetaTag()).toBe(null);
    const { rerender } = render(<Test colorScheme="light" />);

    let meta = getColorSchemeMetaTag();
    expect(meta).toHaveAttribute("content", "light");
    expect(meta).toMatchSnapshot();

    rerender(<Test colorScheme="dark" />);
    expect(meta).not.toBeInTheDocument();
    meta = getColorSchemeMetaTag();
    expect(meta).toHaveAttribute("content", "dark");
    expect(meta).toMatchSnapshot();

    rerender(<Test colorScheme="dark" disabled />);
    expect(meta).not.toBeInTheDocument();
    expect(getColorSchemeMetaTag()).toBe(null);
  });
});
