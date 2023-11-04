import { beforeEach, describe, expect, it } from "@jest/globals";
import { rmdRender, screen } from "../../test-utils/index.js";
import { MaterialIcon } from "../MaterialIcon.js";
import { createRef } from "react";
import { MATERIAL_CONFIG } from "../materialConfig.js";

describe("MaterialIcon", () => {
  beforeEach(() => {
    MATERIAL_CONFIG.iconFamily = "filled";
  });

  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLSpanElement>();
    const props = {
      "data-testid": "icon",
      ref,
      name: "air",
    } as const;

    const { rerender } = rmdRender(<MaterialIcon {...props} />);

    const icon = screen.getByTestId("icon");
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toBe(icon);
    expect(icon).toMatchSnapshot();

    rerender(
      <MaterialIcon
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(icon).toMatchSnapshot();
  });

  it("should support overriding the icon family through the MATERIAL_CONFIG", () => {
    const props = {
      "data-testid": "icon",
      name: "air",
    } as const;
    const { rerender } = rmdRender(<MaterialIcon {...props} />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveClass("material-icons");
    expect(icon).toMatchSnapshot();

    MATERIAL_CONFIG.iconFamily = "rounded";

    rerender(<MaterialIcon {...props} />);
    expect(icon).toHaveClass("material-icons-round");
    expect(icon).toMatchSnapshot();

    MATERIAL_CONFIG.iconFamily = "two-tone";

    rerender(<MaterialIcon {...props} />);
    expect(icon).toHaveClass("material-icons-two-tone");
    expect(icon).toMatchSnapshot();
  });

  it("should support overriding the icon family through the family prop", () => {
    const props = {
      "data-testid": "icon",
      name: "air",
      family: "filled",
    } as const;
    const { rerender } = rmdRender(<MaterialIcon {...props} />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveClass("material-icons");
    expect(icon).toMatchSnapshot();

    rerender(<MaterialIcon {...props} family="rounded" />);
    expect(icon).toHaveClass("material-icons-round");
    expect(icon).toMatchSnapshot();

    rerender(<MaterialIcon {...props} family="two-tone" />);
    expect(icon).toHaveClass("material-icons-two-tone");
    expect(icon).toMatchSnapshot();
  });
});
