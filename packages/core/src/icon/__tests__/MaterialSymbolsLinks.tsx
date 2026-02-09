import { preconnect } from "react-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { render, screen } from "../../test-utils/index.js";
import { MaterialSymbolsLinks } from "../MaterialSymbolsLinks.js";

vi.mock("react-dom", async (importActual) => ({
  ...(await importActual()),
  preconnect: vi.fn(),
}));

const preconnectMock = vi.mocked(preconnect);

describe("MaterialSymbolsLinks", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should default to adding preconnect links to the google fonts and rendering the correct google fonts api url with the `MATERIAL_CONFIG` and `DEFAULT_MATERIAL_SYMBOL_NAMES`", () => {
    render(<MaterialSymbolsLinks data-testid="link" />);

    expect(preconnectMock).toHaveBeenCalledTimes(2);
    expect(preconnectMock).toHaveBeenCalledWith("https://fonts.googleapis.com");
    expect(preconnectMock).toHaveBeenCalledWith("https://fonts.gstatic.com", {
      crossOrigin: "",
    });

    expect(screen.getByTestId("link")).toMatchSnapshot();
  });

  it("should allow the preconnect links to be disabled", () => {
    render(<MaterialSymbolsLinks data-testid="link" disablePreconnect />);

    expect(preconnectMock).not.toHaveBeenCalled();
    expect(() => screen.getByTestId("link")).not.toThrowError();
  });
});
