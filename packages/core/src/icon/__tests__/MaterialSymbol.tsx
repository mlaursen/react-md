import { beforeEach, describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render, screen } from "../../test-utils/index.js";
import { MaterialSymbol } from "../MaterialSymbol.js";
import { MATERIAL_CONFIG } from "../materialConfig.js";

describe("MaterialSymbol", () => {
  beforeEach(() => {
    MATERIAL_CONFIG.fill = 0;
    MATERIAL_CONFIG.weight = 400;
    MATERIAL_CONFIG.grade = 0;
    MATERIAL_CONFIG.opticalSize = 24;
    MATERIAL_CONFIG.family = "outlined";
  });

  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLSpanElement>();
    const props = {
      "data-testid": "icon",
      ref,
      name: "air",
    } as const;

    const { rerender } = render(<MaterialSymbol {...props} />);

    const icon = screen.getByTestId("icon");
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toBe(icon);
    expect(icon).toMatchSnapshot();

    rerender(
      <MaterialSymbol
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(icon).toMatchSnapshot();
  });

  it("should support overriding the symbol configuration through the MATERIAL_CONFIG object", () => {
    const props = {
      "data-testid": "icon",
      name: "air",
    } as const;
    const { rerender } = render(<MaterialSymbol {...props} />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveClass("material-symbols-outlined");
    expect(icon).toMatchSnapshot();

    MATERIAL_CONFIG.fill = 1;
    MATERIAL_CONFIG.grade = -25;
    MATERIAL_CONFIG.family = "rounded";
    MATERIAL_CONFIG.opticalSize = 48;
    MATERIAL_CONFIG.weight = 100;

    rerender(<MaterialSymbol {...props} />);
    expect(icon).toHaveClass("material-symbols-rounded");
    expect(icon).toMatchSnapshot();
  });

  it("should use inline styles for font variation settings when they do not match the MATERIAL_CONFIG", () => {
    const props = {
      "data-testid": "icon",
      name: "air",
    } as const;
    const { rerender } = render(<MaterialSymbol {...props} />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveClass("material-symbols-outlined");
    expect(icon.style.fontVariationSettings).toBe("");

    rerender(<MaterialSymbol {...props} fill={1} />);
    expect(icon.style.fontVariationSettings).toBe(
      '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24'
    );

    rerender(
      <MaterialSymbol {...props} fill={1} grade={-25} opticalSize={48} />
    );
    expect(icon.style.fontVariationSettings).toBe(
      '"FILL" 1, "wght" 400, "GRAD" -25, "opsz" 48'
    );
  });

  it("should use the prop style fontVariationSettings if it exists", () => {
    const props = {
      "data-testid": "icon",
      name: "air",
      style: {
        fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" -25, "opsz" 48',
      },
    } as const;
    render(<MaterialSymbol {...props} />);
    const icon = screen.getByTestId("icon");

    expect(icon.style.fontVariationSettings).toBe(
      '"FILL" 1, "wght" 400, "GRAD" -25, "opsz" 48'
    );
  });
});
