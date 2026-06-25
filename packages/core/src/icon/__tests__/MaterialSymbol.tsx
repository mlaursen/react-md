import { createRef } from "react";
import { beforeEach, describe, expect, it } from "vitest";

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
    expect(icon).toHaveStyle({ fontVariationSettings: "" });

    rerender(<MaterialSymbol {...props} fill={1} />);
    expect(icon).toMatchSnapshot();
    expect(icon).toHaveStyle({
      "--rmd-symbol-fill": "1",
    });

    rerender(
      <MaterialSymbol {...props} fill={1} grade={-25} opticalSize={48} />
    );
    expect(icon).toMatchSnapshot();
    expect(icon).toHaveStyle({
      "--rmd-symbol-fill": "1",
      "--rmd-symbol-grad": "-25",
      "--rmd-symbol-opsz": "48",
    });
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

    expect(icon).toHaveStyle({
      fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" -25, "opsz" 48',
    });
  });

  it("should always prefer the style prop over the props", () => {
    const { rerender } = render(
      <MaterialSymbol
        data-testid="icon"
        name="air"
        fill={1}
        weight={100}
        grade={-25}
        opticalSize={20}
        family="rounded"
        style={{
          "--rmd-symbol-fill": 0,
          "--rmd-symbol-wght": 300,
          "--rmd-symbol-opsz": 40,
          "--rmd-symbol-grad": 200,
        }}
      />
    );

    const icon = screen.getByTestId("icon");
    expect(icon.style.getPropertyValue("--rmd-symbol-fill")).toBe("0");
    expect(icon.style.getPropertyValue("--rmd-symbol-wght")).toBe("300");
    expect(icon.style.getPropertyValue("--rmd-symbol-opsz")).toBe("40");
    expect(icon.style.getPropertyValue("--rmd-symbol-grad")).toBe("200");

    rerender(
      <MaterialSymbol
        data-testid="icon"
        name="air"
        fill={1}
        weight={100}
        grade={-25}
        opticalSize={20}
        family="rounded"
      />
    );
    expect(icon.style.getPropertyValue("--rmd-symbol-fill")).toBe("1");
    expect(icon.style.getPropertyValue("--rmd-symbol-wght")).toBe("100");
    expect(icon.style.getPropertyValue("--rmd-symbol-opsz")).toBe("20");
    expect(icon.style.getPropertyValue("--rmd-symbol-grad")).toBe("-25");
  });

  it("should force the font variation settings if the prop is defined", () => {
    render(
      <MaterialSymbol
        data-testid="icon"
        name="air"
        fill={MATERIAL_CONFIG.fill}
        weight={MATERIAL_CONFIG.weight}
        grade={MATERIAL_CONFIG.grade}
        opticalSize={MATERIAL_CONFIG.opticalSize}
        family="rounded"
      />
    );

    const icon = screen.getByTestId("icon");
    expect(icon.style.getPropertyValue("--rmd-symbol-fill")).toBe(
      `${MATERIAL_CONFIG.fill}`
    );
    expect(icon.style.getPropertyValue("--rmd-symbol-wght")).toBe(
      `${MATERIAL_CONFIG.weight}`
    );
    expect(icon.style.getPropertyValue("--rmd-symbol-grad")).toBe(
      `${MATERIAL_CONFIG.grade}`
    );
    expect(icon.style.getPropertyValue("--rmd-symbol-opsz")).toBe(
      `${MATERIAL_CONFIG.opticalSize}`
    );
  });
});
